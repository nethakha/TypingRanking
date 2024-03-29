
document.onkeydown = function() {
    let loc = location.href.split('/')[4].split('#')[0];
    let param = typeof location.hash != undefined
        ? location.hash : 0;
    let [p, n] = loc == 'total' ? rankHash(param, loc) : rankHash(param);

    console.log("key input");
    console.log(param)

    switch(event.keyCode) {
        case 37:
        case 39:
        event.preventDefault();
    }

    if(event.keyCode == 39 && n != 0 && n != -1) {
        location.hash = 'rank' + n;
    } else if(event.keyCode == 37 && p != -1) {
        location.hash = 'rank' + p;
    }
}

function rankHash(param, loc) {
    if (loc == 'total') {
        switch (param) {
            case '#rank1':
                return [0, -1];
                break;
            default :
                return [-1, 1];
                break;
        }
    } else {
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
}
