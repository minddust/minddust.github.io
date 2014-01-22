$(document).ready(function() {
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    $('[data-toggle="tooltip"]').tooltip({
        'placement': 'top'
    });
});
