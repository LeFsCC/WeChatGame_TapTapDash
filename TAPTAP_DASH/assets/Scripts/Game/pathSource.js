var blocks = function(total, difficulty) {
    console.log(total, difficulty)
    var blocks = []
    var Block = {
        x: 0,
        y: 0,
        exist: false,
        hasStar: false,
        direct: 'vertical' // vertical, right, left
    }
    var count = 0
    let geneDiffFlag = 0
    let disProb = 0
    let turnProb = 0
    let starProb = 0
    switch (difficulty) {
        case 'easy':
            {
                geneDiffFlag = 5
                disProb = 0.1
                turnProb = 0.2
                starProb = 0.2
                break
            }
        case 'normal':
            {
                geneDiffFlag = 4
                disProb = 0.3
                turnProb = 0.4
                starProb = 0.25
                break
            }
        case 'hard':
            {
                geneDiffFlag = 2
                disProb = 0.7
                turnProb = 0.8
                starProb = 0.4
                break
            }
        default:
            {
                geneDiffFlag = 2
                disProb = 0.7
                turnProb = 0.7
                starProb = 0.5
                break
            }
    }
    for (var i = 0; i < total; i++) {
        if (i === 0) {
            var before = Block;
        } else {
            var before = blocks[i - 1]
        }
        var bx = before.x
        var by = before.y
        var bd = before.direct
        var b = Object.create(Block)
        b.exist = true
        b.hasStar = false
        if (i <= 2) {
            b.direct = bd
        } else {
            //产生障碍
            if (count >= geneDiffFlag) {
                var dis = Math.random()
                var turn = Math.random()
                if (dis < disProb) {
                    b.exist = false
                    b.direct = bd
                    count = 0
                } else {
                    if (turn < turnProb * count) {
                        if (bd === 'vertical') {
                            var d = Math.random()
                            if (d < 0.5) {
                                b.direct = 'right'
                            } else {
                                b.direct = 'left'
                            }
                        } else {
                            b.direct = 'vertical'
                        }
                        count = 0
                    } else {
                        count++
                        b.direct = bd
                    }
                }
            } else {
                count++
                b.direct = bd
            }
        }

        //确定位置
        switch (b.direct) {
            case 'vertical':
                {
                    b.direct = 'vertical'
                    b.x = bx
                    b.y = by + 250
                    break;
                }
            case 'left':
                {
                    b.direct = 'left'
                    b.x = bx - 250
                    b.y = by
                    break;
                }
            case 'right':
                {
                    b.direct = 'right'
                    b.x = bx + 250
                    b.y = by
                    break;
                }
        }

        //产生星星
        if (b.exist === true) {
            var starflag = Math.random()
            if (starflag < starProb) {
                b.hasStar = true
            }
        }
        blocks[i] = b
    }
    return blocks
}
module.exports = {
    blocks
}