$(function() {
    console.time("setting up click events.");
    $(".navbutton").each(function(i, el) {
        that = this;
        $(this).on('click', function(e) {
            e.preventDefault();
            history.pushState({}, this.id, this.href);
            $mainbar = $('.mainbar');
            $mainbar.hasClass('activated') ? $mainbar.removeClass('activated') : $mainbar.addClass('activated');
            return false;
        })
    });
    console.timeEnd("setting up click events.");
});

$(function() {
    var $subwindows;
    $subwindows = $('.subwindow');
    $subwindows.on('click', function alternate (e) {

        e.stopPropagation();
        var $this, $right, $left, $others;

        if (($this = $(this)).hasClass('selected')) {
            $('.row-fluid').removeClass('go')
            $('.subwindow').removeClass('selected right left');
        } else {
            $('.selected').removeClass('selected');
            $this.addClass('selected');
            $right = $subwindows.filter('div.selected ~ div');
            $left = $subwindows.not($right).not(this);
            $left.addClass('left');
            $right.addClass('right');
            $('.row-fluid').addClass('go');
        }
    } );
});



/*
getCode = function(e) {
    var repos, req;
    req = new XMLHttpRequest();
    req.open('GET', 'https://api.github.com/user/repos');
    req.setRequestHeader('Authorization', 'token 8f8f36e3b95c020f4bf7679c48609bac4576fec5');
    req.onload = codeLoaded.bind(this);
    req.send();

    function codeLoaded() {
        if (req.status == 200) {
            repos = eval(req.response);
            console.log(repos);
        } else {
            console.log('Some type of problem with the AJAX request!');
            console.log(req); }

        function populateMainbar(repos) {
            var links, mainbar;
            mainbar = document.getElementById('mainbar');
            repos.forEach( function(repo) {
                var link;
                link = document.createElement('a');
                link.id = repo.name;
                link.setAttribute('class', 'repo');
                mainbar.app
                
            });
    }
};
*/
