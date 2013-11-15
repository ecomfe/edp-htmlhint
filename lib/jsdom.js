/**
 * @file simple dom simulation
 * @author chris[wfsr@foxmail.com]
 */

var NodeType = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9
};

function appendChild(child) {
    child.parentNode = this;
    this.childNodes.push(child);
}

function createTextNode(text) {
    return {
        nodeValue: text || '',
        nodeType: NodeType.TEXT_NODE
    };
}

function createComment(text) {
    return {
        nodeValue: text || '',
        nodeType: NodeType.COMMENT_NODE
    };
}

function createElement(tag) {
    return {
        tagName: tag.toUpperCase(),
        nodeType: NodeType.ELEMENT_NODE,
        nodeValue: '',
        childNodes: [],
        querySelectorAll: querySelectorAll,
        appendChild: appendChild,
        hasAttribute: hasAttribute,
        getAttribute: getAttribute,
        setAttribute: setAttribute,
        attributes: {}
    };
}

function hasAttribute(name) {
    return name in this.attributes;
}

function getAttribute(name) {
    return this.attributes[name];
}

function setAttribute(name, value) {
    return this.attributes[name] = value;
}

function getNodes(nodes, result) {
    for (var i = 0, node; node = nodes[i++];) {
        result.push(node);
        if (node.childNodes.length) {
            getNodes(node.childNodes, result);
        }
    }
    return result;
}

function querySelectorAll(selector) {
    var all = getNodes(this.childNodes, []);

    if (selector === '*') {
        return all;
    }
}

function extend(src, target) {
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            src[key] = target[key];
        }
    }
    return src;
}

exports.dom = function () {
    var doc = createElement('html');
    extend(doc, { 
        nodeType: NodeType.DOCUMENT_NODE,
        createElement: createElement,
        createTextNode: createTextNode,
        createComment: createComment
    });

    extend(doc, NodeType);

    return doc;
};