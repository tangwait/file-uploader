document.addEventListener("DOMContentLoaded", function() {
    const infoIcons = document.querySelectorAll('.info-icon');
    const closeDetails = document.querySelectorAll('.close-details');

    infoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const fileInfo = this.nextElementSibling;
            if (fileInfo.style.display === "none" || fileInfo.style.display === "") {
                fileInfo.style.display = "block";
            } else {
                fileInfo.style.display = "none";
            }
        });
    });

    closeDetails.forEach(x => {
        x.addEventListener('click', function() {
            const fileInfo = this.closest('.file-details');
            fileInfo.style.display = "none";
        });
    });
});
