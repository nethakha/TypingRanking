document.onkeydown = function() {
    let param = typeof location.hash != undefined
        ? location.hash : 0;
    let [p, n] = rankHash(param);

    console.log("key input");
    console.log(param)

    switch(event.keyCode) {
        case 37:
        case 39:
        event.preventDefault();
    }

    if(event.keyCode == 39 && n != 0) {
        location.hash = 'rank' + n;
    } else if(event.keyCode == 37) {
        location.hash = 'rank' + p;
    }
}

function rankHash(param) {
    switch (param) {
        case '#rank5':
            return [0, 4];
            break;
        case '#rank4':
            return [5, 3];
            break;
        case '#rank3':
            return [4, 2];
            break;
        case '#rank2':
            return [3, 1];
            break;
        case '#rank1':
            return [2, 0];
            break;
        default : // rank0で部門画面にしようかな
            return [0, 5];
            break;
    }
}
