(function (md, $, undefined) {

    function Gallery($gallery) {
        this.$gallery = $gallery;
        this.$modal = this.getOrCreateModal();
        this.imgWrapper = this.$modal.find('.img-wrapper')[0];
        this.count = this.$gallery.children().length;
        this.index = 0;

        this.registerThumbnails();
        this.registerOverlay();
        this.registerKeys();
        this.registerResize();
    }

    Gallery.prototype.getOrCreateModal = function () {
        var $modal = $('#modal-gallery');

        if ($modal.length === 0) {
            $modal = $(
                '<div id="modal-gallery" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">' +
                '    <div class="img-container">' +
                '        <div class="img-wrapper">' +
                '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '            <button class="img-prev text-left"><span class="fa fa-angle-left"></span></button>' +
                '            <img class="img-responsive" src="#">' +
                '            <button class="img-next text-right"><span class="fa fa-angle-right"></span></button>' +
                '        </div>' +
                '    </div>' +
                '</div>').appendTo($('body'));
        }

        return $modal;
    };

    Gallery.prototype.registerThumbnails = function () {
        var self = this;
        this.$gallery.find('a[data-thumbnail]').off('click').on('click', function (e) {
            e.preventDefault();

            self.index = $(this).index();
            self.displayImage();

            self.$modal.modal();
        });
    };

    Gallery.prototype.registerOverlay = function () {
        var self = this;
        this.$modal.find('.img-prev').off('click').on('click', function () {
            self.index--;
            self.displayImage();
        });
        this.$modal.find('.img-next').off('click').on('click', function () {
            self.index++;
            self.displayImage();
        });
    };

    Gallery.prototype.registerKeys = function () {
        var self = this;
        $(document).off('keyup').on('keyup', function (e) {
            if (e.keyCode === 37) {
                self.index--;
                self.displayImage();
            }
            if (e.keyCode === 39) {
                self.index++;
                self.displayImage();
            }
            if (e.keyCode === 27) {
                self.$modal.modal('hide');
            }
        });
    };

    Gallery.prototype.registerResize = function () {
        var self = this;
        $(window).resize(function () {
            if (self.imgWrapper !== undefined) {
                self.imgWrapper.style.display = 'none';
                self.imgWrapper.offsetHeight;  // force reflow / relayout
                self.imgWrapper.style.display = 'inline-block';
            }
        });
    };

    Gallery.prototype.displayImage = function () {
        this.index = this.index >= this.count ? 0 : this.index;
        this.index = this.index < 0 ? this.count - 1 : this.index;

        var link = this.$gallery.children().eq(this.index);

        this.$modal.find('img').attr('src', link.attr('href'));
    };

    md.registerGalleries = function () {
        $('[data-toggle="gallery"]').each(function () {
            var $gallery = $(this);
            var data = $gallery.data('md.gallery');

            if (!data) {
                $gallery.data('md.gallery', new Gallery($gallery));
            }
        });
    }

}(window.md = window.md || {}, jQuery));

$(document).ready(function () {
    md.registerGalleries();
});
