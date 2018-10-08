/**
 * attr属性mapping表
 * 以微信小程序为优先,一一对应
 */

const wxAttrs = [
  'wx:for',
  'wx:for-index',
  'wx:for-item',
  'wx:key',
  'wx:if',
  'wx:elif',
  'wx:else'
]

const swanAttrs = [
  's-for',
  's-for-index',
  's-for-item',
  's-key', // ''
  's-if',
  's-elif',
  's-else'
]

const MATCH_BRACE = /(?:{)+([^}]+)(?:})+/

const swanTranformAttrValue = (node) => {
  // template: data={{}} => data={{{}}}
  if (node.tag === 'template') {
    const data = node.attrs.data
    if (!data) return
    node.attrs.data = data.replace(MATCH_BRACE, (g, $1) => {
      return `{{{${$1}}}}`
    })
  }
  if (node.tag === 'scroll-view') {
    // {{ scroll }} => {= scroll =}
    ['scroll-top', 'scroll-left', 'scroll-into-view'].forEach((attr) => {
      const contains = !!node.attrs[attr]
      if (!contains) return
      node.attrs[attr] = node.attrs[attr].replace(MATCH_BRACE, (g, $1) => {
        return `{= ${$1} =}`
      })
    })
  }
  return node
}

const mapping = {
  attr: {
    wx: wxAttrs,
    s: swanAttrs,
    swan: swanAttrs
  },
  attrValue: {
    wx: node => node,
    s: swanTranformAttrValue,
    swan: swanTranformAttrValue
  }
}

export default function getMapping(source, target) {
  return {
    attr: {
      source: ignoreEmptyAttr(mapping.attr[source]),
      target: ignoreEmptyAttr(mapping.attr[target])
    },
    attrValue: mapping.attrValue[target]
  }
}

function ignoreEmptyAttr(attrs) {
  return attrs.filter(attr => !!attr)
}
