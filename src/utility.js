export const DRAWER_WIDTH = "240px";

/**
 * Get action label according to page name
 *
 * @param {string} pageName The name of the page
 */
export function getActionName(pageName) {
  switch (pageName.toLowerCase()) {
    case "manage staff":
      return "Add new staff member";

    case "manage hotels":
      return "Add a new hotel";

    case "manage activities":
      return "Add new activity";
    default:
      return "";
  }
}

export function downloadFile(fileUrl){
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = fileUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
