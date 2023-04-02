/**
 * @name AAServerCounterInFolder
 * @author Sleezzi
 * @description Add a server counter in server folders
 * @version 0.0.1
 */

module.exports = SleezziPlugin => {
    const SleezziPluginDiv = document.createElement("div");
    return {
        start: () => {
            document.querySelectorAll('.closedFolderIconWrapper-3tRb2d').forEach((dossier) => {
                if (!dossier.querySelector(".SleezziPluginDiv")) {
                    if (dossier.querySelectorAll('.icon-1zKOXL').length >= 4) {
                        dossier.lastElementChild.style.opacity = "0";
                    }
                    const SleezziPluginDiv = document.createElement('div');
                    SleezziPluginDiv.style.display = "flex";
                    SleezziPluginDiv.className = "SleezziPluginDiv";
                    SleezziPluginDiv.style.position = 'relative';
                    SleezziPluginDiv.innerHTML = `<span style="position: absolute;botom: 0;left: 0;color: white;">${dossier.querySelectorAll('.icon-1zKOXL').length}</span>`;
                    dossier.prepend(SleezziPluginDiv);
                }
            });
        },
        stop: () => {
            document.querySelectorAll('.closedFolderIconWrapper-3tRb2d').forEach((dossier) => {
                if (dossier.querySelector(".SleezziPluginDiv")) {
                    dossier.querySelector(".SleezziPluginDiv").remove();
                    dossier.lastElementChild.style.opacity = "1";
                }
            });
        }
    }
};
