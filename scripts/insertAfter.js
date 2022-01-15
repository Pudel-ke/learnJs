function insertAfter(newNode, targetNode) {
    if (targetNode.parentNode.lastChild == targetNode) {
        targetNode.parentNode.appendChild(newNode);
    }
    else {
        targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling);
    }
}