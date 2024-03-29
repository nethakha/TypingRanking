var express = require('express');
var router = express.Router();
var app = express();

// JSONのデータを保持する配列
var jsonData = [];
// JSONの追加データを受け取る変数
var addData;

// Pugを用いる
app.set("view engine", "pug");


// score/ にGETリクエストが飛んできた場合、
// JSONデータを表示する
router.get('/', function(req, res) {
    res.send(jsonData);
});


router.get('/dev/c', function(req, res) {
    res.render('score/c.pug');
});


// 管理画面の表示処理
router.get('/dev', function(req, res) {
    res.render('score/index_dev.pug', {json_data:jsonData});
});
// 管理画面に通知があった場合
router.get('/dev', function(req, res, next) {
    if(req.query.valid) {
        res.render('score/index_dev.pug', {json_data:jsonData, g:req.query.valid});
    } else {
        next();
    }
});


// 日本語部門、英語部門、総合優勝ページの表示処理
router.get('/ja', function(req, res) {
    res.render('score/index.pug', {json_data:jsonData, dept:'日本文部門', dept_code:'JA'});
});
router.get('/en', function(req, res) {
    res.render('score/index.pug', {json_data:jsonData, dept:'英文部門', dept_code:'EN'});
});
router.get('/total', function(req, res) {
    res.render('score/index.pug', {json_data:jsonData, dept:'総合優勝', dept_code:'TOTAL'});
});


// score/に対してPOSTがあった場合の処理
//
// 部門、順位、スコア、学科名、競技者名
// dept, rank, score, course, name
//
// dept   は JA, EN, TOTAL の3つ
// rank   は 1 2 3 4 5     の5つ
// score  は 数値
// course は 文字列
// name   は 文字列
//
router.post('/', function(req, res) {
    console.log(req.body.json);
    let message, ret, r = req.body;
    if(req.body.json !== undefined) {
        r = JSON.parse(req.body.json);
        console.log(r);
    }
    if(r instanceof Array) {
        let i;
        for(i = 0; i < r.length; i++) {
            addData = { dept:   r[i].dept,
                        rank:   r[i].rank,
                        score:  r[i].score,
                        course: r[i].course,
                        name:   r[i].name
            };
            jsonData.push(addData);
        }
        ret = JSON.stringify(r);
        message = i + "個のデータを追加しました。" + ret;
    } else {
        addData = { dept:   r.dept,
                    rank:   r.rank,
                    score:  r.score,
                    course: r.course,
                    name:   r.name
        };
        jsonData.push(addData);
        ret = JSON.stringify(addData);
        message = "次のデータを追加しました。" + ret;
    }

    if(req.body.ua === 'web') {
        // let str = addData; // ← なんだっけこれ
        res.redirect('/score/dev?valid=' + message);
    } else {
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send(ret);
    }
});


// PostによるDelete実装
router.post('/dev', function(req, res) {
    let ret, num = Number(req.body.number);
    if(jsonData.length !== 0) {
        if(num === -1) {
            jsonData = [];
            ret = "ぜんぶきれいに掃除しておきましたぁっ！……え？まずかったんですか？";
            res.render('score/index_dev.pug', {json_data:jsonData, g:ret});
        } else if(num !== -1) {
            jsonData.splice(num, 1);
            ret = num + "番目の要素を消しちゃいました〜っあせあせ";
            res.render('score/index_dev.pug', {json_data:jsonData, g:ret});
        }
    } else {
        ret = "そんな要素ありませんよ〜ご主人さま〜？";
        res.render('score/index_dev.pug', {json_data:jsonData, g:ret});
    }
});


// 添字を受け取る
// DeleteによるDelete実装
router.delete('/:number', function(req, res) {
    let num = req.params.number;
    if(jsonData.length !== 0) {
        jsonData.splice(num, 1);
        ret = num + "を消しちゃいました〜っあせあせ";
    } else {
        ret = "そんな要素ありませんよ〜ご主人さま〜？";
    }
    res.send(ret);
});


module.exports = router;
