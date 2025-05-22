
export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function contains(parent, child) {
    if (parent.toLowerCase().includes(child.toLowerCase())) {
        return true;
    }
    return false;
}
