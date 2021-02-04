/**
 * Get action label according to page name
 *
 * @param {string} pageName The name of the page
 */
export function getActionName(pageName) {
    switch (pageName.toLowerCase()) {
        case 'manage staff':
            return 'Add new staff member';
            
        case 'manage hotels':
            return 'Add a new hotel';
            
        case 'manage activities':
            return 'Add new activity';
        default:
            return '';
    }
}