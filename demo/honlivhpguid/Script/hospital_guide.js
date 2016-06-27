/**
 * Created by wangdesen on 16/6/22.
 */

/**
 * js原生状态机
 * */
//var Switch = function ($elem) {
//
//    var log = function (fsm, previousState) {
//        console.log('currentState is : ' + fsm.currentState + ((previousState || '') && (' , and previous state is : ' + previousState)));
//    };
//
//    return {
//        currentState: 'front',
//        init: function () {
//            var self = this;
//            $elem.on('click', (function () {
//                var args = arguments;
//                return function () {
//                    self.transition(args);
//                }
//            })());
//            log(this);
//        },
//        transition: function (e) {
//            switch(this.currentState) {
//                case "front":
//                    this.currentState = 'back';
//                    $("#myimg").attr("src","images/mab.jpg");
//                    break;
//                case "back":
//                    this.currentState = 'front';
//                    $("#myimg").attr("src","images/maf.jpg");
//                    break;
//                default:
//                    console.log('Invalid State!');
//                    break;
//            }
//            log(this);
//        }
//    }
//};



/**
 * 采用javascript-state-machine.js的状态机
 * */
//var Switch = function ($elem) {
//
//    var log = function (from, to) {
//        console.log('currentState is : ' + to + ((from || '') && (' , and previous state is : ' + from)));
//    };
//    fsm = StateMachine.create({
//        initial: 'front',
//        error:function(eventName, from, to, args, errorCode, errorMessage){
//            console.log("event "+ eventName + " was naughty :- " + errorMessage);
//        },
//        events: [
//            {name: 'turnFront', from: 'back', to: 'front'},
//            {name: 'turnBack', from: 'front', to: 'back'}
//        ],
//        callbacks: {
//            onbeforeturnFront: function(event, from, to){
//                console.log("正在切换正面...");
//                //console.log("为了省电，今儿不开灯了!");
//                //return false;
//            },
//            onleaveback: function(event, from, to){
//                console.log("此刻的状态是：" + from + ",要执行的动作是：" + event + ",下一个状态是：" + to);
//
//                $("p").slideUp(1500, function() {
//                    fsm.transition();
//                    //fsm.cancel();
//                });
//                return StateMachine.ASYNC;
//            },
//            onenterfront: function(event, from, to){
//                console.log("马上要变成：" + to + ",上一个状态是：" + from +",它是由：" + event + "触发的！")
//            },
//            onafterturnFront: function(event, from ,to){
//                $("#myimg").attr("src","images/maf.jpg");
//                console.log("来到了正面！");
//                //$elem.addClass('on');
//                log(from, to);
//            },
//
//            onafterturnBack: function(event, from, to) {
//                //$elem.removeClass('on');
//                $("#myimg").attr("src","images/mab.jpg");
//                console.log("来到了背面！");
//                log(from, to);
//            }
//        }
//    });
//    $elem.on('click', function(){
//        fsm[fsm.transitions()[0]]();
//    });
//
//    log(undefined, fsm.current);
//
//    return fsm;
//};

/**
 * 状态机@version 3.0
 *
 * 多状态切换
 * */
demo = function(){

    /**
     * 三个按钮，一个图片区域
     *
     * m2f:男、女切换
     * a2c:成人、儿童切换
     * f2b:正面、背面切换
     * */
    var demo   = document.getElementById('iPicture'),
        m2f  = document.getElementById('m2f'),
        a2c   = document.getElementById('a2c'),
        f2b   = document.getElementById('f2b');

    //切换背景图，打印转换状态
    var log = function (from, to) {
        //demo.className = fsm.current;
        $("#myimg").attr("src","images/humanbody/"+fsm.current+".jpg");
        console.log('currentState is : ' + to + ((from || '') && (' , and previous state is : ' + from)));
    };

    var fsm = StateMachine.create({

        /**
         * 共24种状态变化
         * none ——>男-成人-正面
         *
         * 男-成人-正面 ——>男-成人-背面
         * 男-成人-正面 ——>男-小孩-正面
         * 男-成人-正面 ——>女-成人-正面
         *
         * 男-成人-背面 ——>男-成人-正面
         * 男-成人-背面 ——>男-小孩-背面
         * 男-成人-背面 ——>女-成人-背面
         *
         * 男-小孩-正面 ——>男-小孩-背面
         * 男-小孩-正面 ——>男-成人-正面
         * 男-小孩-正面 ——>女-小孩-正面
         *
         * 男-小孩-背面 ——>男-小孩-正面
         * 男-小孩-背面 ——>男-成人-背面
         * 男-小孩-背面 ——>女-小孩-背面
         *
         * -------------------------
         *
         * 女-成人-正面 ——>男-成人-背面
         * 女-成人-正面 ——>男-小孩-正面
         * 女-成人-正面 ——>女-成人-正面
         *
         * 女-成人-背面 ——>男-成人-正面
         * 女-成人-背面 ——>男-小孩-背面
         * 女-成人-背面 ——>女-成人-背面
         *
         * 女-小孩-正面 ——>男-成人-正面
         * 女-小孩-正面 ——>男-小孩-背面
         * 女-小孩-正面 ——>女-成人-背面
         *
         * 女-小孩-背面 ——>男-成人-正面
         * 女-小孩-背面 ——>男-成人-正面
         * 女-小孩-背面 ——>男-成人-正面
         *
         * */
        events: [
            { name: 'start', from: 'none',   to: 'maf'  },
            //正面-反面
            { name: 'f2b', from: 'maf',   to: 'mab'  },
            { name: 'f2b', from: 'mcf',   to: 'mcb'  },
            { name: 'f2b', from: 'faf',   to: 'fab'  },
            { name: 'f2b', from: 'fcf',   to: 'fcb'  },
            { name: 'f2b', from: 'mab',   to: 'maf'  },
            { name: 'f2b', from: 'mcb',   to: 'mcf'  },
            { name: 'f2b', from: 'fab',   to: 'faf'  },
            { name: 'f2b', from: 'fcb',   to: 'fcf'  },

            //男-女
            { name: 'm2f', from: 'maf',   to: 'faf'  },
            { name: 'm2f', from: 'mab',   to: 'fab'  },
            { name: 'm2f', from: 'mcf',   to: 'fcf'  },
            { name: 'm2f', from: 'mcb',   to: 'fcb'  },
            { name: 'm2f', from: 'faf',   to: 'maf'  },
            { name: 'm2f', from: 'fab',   to: 'mab'  },
            { name: 'm2f', from: 'fcf',   to: 'mcf'  },
            { name: 'm2f', from: 'fcb',   to: 'mcb'  },

            //成人-儿童
            { name: 'a2c', from: 'maf',   to: 'mcf'  },
            { name: 'a2c', from: 'mab',   to: 'mcb'  },
            { name: 'a2c', from: 'faf',   to: 'fcf'  },
            { name: 'a2c', from: 'fab',   to: 'fcb'  },
            { name: 'a2c', from: 'mcf',   to: 'maf'  },
            { name: 'a2c', from: 'mcb',   to: 'mab'  },
            { name: 'a2c', from: 'fcf',   to: 'faf'  },
            { name: 'a2c', from: 'fcb',   to: 'fab'  }
        ],

        callbacks: {
            onbeforestart: function(event, from, to) { console.log("要开始了..."); },
            onstart:       function(event, from, to) { log(from, to); },

            onbeforem2f:  function(event, from, to) { console.log("性别转换中...");  },
            onbeforef2b: function(event, from, to) { console.log("正在转身..."); },
            onbeforea2c:  function(event, from, to) { console.log("成人儿童互换..."); },

            onm2f:        function(event, from, to) { log(from, to);},
            onf2b:       function(event, from, to) { log(from, to); },
            ona2c:        function(event, from, to) { log(from, to);}

            //onchangestate: function(event, from, to) {
            //    console.log("CHANGED STATE: " + from + " to " + to);
            //}
        }
    });

    fsm.start();
    return fsm;

}();


function openlayer(obj){
    console.log(obj.className);
    var body_part_id = body_part.indexOf(obj.id);
    var body_img_id = body_img.indexOf(demo.current);
    var part_symptom = symptom[body_part_id][body_img_id][0];
    console.log(part_symptom.length);
    var htmlstr = '<div class="weui_cells_title">'+ symptom[body_part_id][body_img_id][1] +'</div>' +
        '<div class="weui_cells weui_cells_access">';
    part_symptom.forEach(function(e){
        htmlstr += '<a class="weui_cell" href="javascript:;">' +
            '<div class="weui_cell_bd weui_cell_primary"><p>'+ e +'</p></div><div class="weui_cell_ft"></div></a>';
    });
    htmlstr += '</div>';
    layer.open({
        type: 1,
        content: htmlstr,
        //'<div class="weui_cells_title">part:'+ obj.id + ' img:' + demo.current +'</div>' +
        //'<div class="weui_cells weui_cells_access">' +
        //'<a class="weui_cell" href="javascript:;">' +
        //'<div class="weui_cell_bd weui_cell_primary"><p>头疼医头</p></div><div class="weui_cell_ft"></div></a>' +
        //'<a class="weui_cell" href="javascript:;">' +
        //'<div class="weui_cell_bd weui_cell_primary"><p>脚痛医脚</p></div><div class="weui_cell_ft"></div></a>' +
        //'</div>',
        anim: 0,
        style: 'position:fixed; bottom:5%; top:5%; left:30%; width:70%; height:90%; border:none;'
    });
}

function init(){
    console.log("初始化...");
    $('.ip_tooltip').click(function(){
        console.log("binding success...");
        openlayer(this);
    });
}

$(init);

//男正，男背，女正，女背
var body_img = ['maf','mab','faf','fab'];

//身体部位
var body_part = ['body_header','body_neck','body_left_upper_limb','body_right_upper_limb',
        'body_chest','body_abdomen','body_sex_organ','body_lower_limb'];

//病症
var symptom = [
    [
        [['面部疼痛','腮腺肿大','头晕','耳痛','头痛','语言障碍'],'头部'],
        [['面部疼痛','腮腺肿大','头晕','耳痛','头痛','语言障碍'],'头部'],
        [['面部疼痛','腮腺肿大','头晕','耳痛','头痛','语言障碍'],'头部'],
        [['面部疼痛','腮腺肿大','头晕','耳痛','头痛','语言障碍'],'头部']
    ],
    [
        [['吞咽困难','甲状腺肿大','颈部疼痛或僵硬','咽喉疼痛'],'颈部'],
        [['吞咽困难','甲状腺肿大','颈部疼痛或僵硬','咽喉疼痛'],'颈部'],
        [['吞咽困难','甲状腺肿大','颈部疼痛或僵硬','咽喉疼痛'],'颈部'],
        [['吞咽困难','甲状腺肿大','颈部疼痛或僵硬','咽喉疼痛'],'颈部']
    ],
    [
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢']
    ],
    [
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢'],
        [['手腕酸疼'],'上肢']
    ],
    [
        [['咯血','胸痛','咳嗽','肩部疼痛','呼吸困难','咳痰','心悸','喘呜'],'胸部'],
        [['腰痛'],'背部'],
        [['咯血','胸痛','咳嗽','肩部疼痛','呼吸困难','咳痰','心悸','喘呜','乳房疼痛','乳房肿块'],'胸部'],
        [['腰痛'],'背部']
    ],
    [
        [['呕血与黑便','腹部肿胀','胃肠胀气','反酸','食欲异常','腹痛','呃逆','腹泻','恶心呕吐'],'腹部'],
        [['腰痛'],'背部'],
        [['呕血与黑便','腹部肿胀','胃肠胀气','反酸','食欲异常','腹痛','呃逆','腹泻','恶心呕吐','痛经'],'腹部'],
        [['腰痛'],'背部']
    ],
    [
        [['阳痿','早泄'],'生殖器'],
        [['便血','便秘','血尿','肛门痛痒','尿频'],'排泄部'],
        [['闭经','白带异常','月经不调','阴道出血','月经过多'],'生殖器'],
        [['便血','便秘','血尿','肛门痛痒','尿频'],'排泄部']
    ],
    [
        [['踝部肿胀','髋关节疼痛','膝关节疼痛'],'下肢'],
        [['踝部肿胀','髋关节疼痛','膝关节疼痛'],'下肢'],
        [['踝部肿胀','髋关节疼痛','膝关节疼痛'],'下肢'],
        [['踝部肿胀','髋关节疼痛','膝关节疼痛'],'下肢']
    ]
];