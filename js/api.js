/**
 * 每日一言 API 模块
 */
const Hitokoto = {
    // 本地备用语录库 (50+条精选)
    fallbackQuotes: [
        // --- Custom Romantic Quotes (Station Master: Vitality) ---
        { id: 'c1', hitokoto: "你是星辰我愿追,跨越万难只为你", from: "站长", from_who: "活力" },
        { id: 'c2', hitokoto: "生活因你而甜蜜,每日充满新期待", from: "站长", from_who: "活力" },
        { id: 'c3', hitokoto: "爱情如美妙旋律,简单却让人陶醉", from: "站长", from_who: "活力" },
        { id: 'c4', hitokoto: "人海遇见你,是最美的意外", from: "站长", from_who: "活力" },
        { id: 'c5', hitokoto: "在这纷繁复杂的世界里,唯有你的笑容,能让我找到内心的宁静", from: "站长", from_who: "活力" },
        { id: 'c6', hitokoto: "自从遇见你,我生命的每一天,都充满了甜蜜与期待", from: "站长", from_who: "活力" },
        { id: 'c7', hitokoto: "你想走进我的世界,走过我走过的每一寸土地,感受我的感受", from: "站长", from_who: "活力" },
        { id: 'c8', hitokoto: "你是我心中的星辰,闪耀梦境温暖清晨", from: "站长", from_who: "活力" },
        { id: 'c9', hitokoto: "愿化轻风拂你脸庞,带去我所有温柔情", from: "站长", from_who: "活力" },
        { id: 'c10', hitokoto: "岁月流转世界变迁,我们的爱始终如一", from: "站长", from_who: "活力" },
        { id: 'c12', hitokoto: "我曾是漂泊的船,无依无靠；但自你出现,我便有了归航", from: "站长", from_who: "活力" },
        { id: 'c13', hitokoto: "无论春去、夏来、秋至,与你相遇的每一刻,都是最美的时光", from: "站长", from_who: "活力" },
        { id: 'c14', hitokoto: "我愿与你,漫步云端,笑谈风月,浪漫至死不渝", from: "站长", from_who: "活力" },
        { id: 'c15', hitokoto: "你若一直在,我便一直爱。温柔是你,宠溺也是你", from: "站长", from_who: "活力" },
        { id: 'c16', hitokoto: "每天入梦,我都期待与你重逢。因为梦里,是最美的时光", from: "站长", from_who: "活力" },
        { id: 'c17', hitokoto: "无需亲密无间,只愿你懂我深沉,我懂你无言,这便是爱的极致", from: "站长", from_who: "活力" },
        { id: 'c18', hitokoto: "可知晓你与月光的差异？月光洒满夜空,而你,却照亮了我的世界", from: "站长", from_who: "活力" },
        { id: 'c20', hitokoto: "你的眼眸,是我心中最亮的光", from: "站长", from_who: "活力" },
        { id: 'c21', hitokoto: "我愿化作春风,轻轻吹进你的心房", from: "站长", from_who: "活力" },
        { id: 'c22', hitokoto: "愿与你相守,直到世界的尽头", from: "站长", from_who: "活力" },
        { id: 'c23', hitokoto: "悄悄话藏在风中,只愿你能听见", from: "站长", from_who: "活力" },
        { id: 'c24', hitokoto: "你知吗,每个晨曦醒来,我心仍沐浴着爱的露珠", from: "站长", from_who: "活力" },
        { id: 'c25', hitokoto: "星河轻语,月光呢喃,此刻我沉醉于爱你的深渊", from: "站长", from_who: "活力" },
        { id: 'c26', hitokoto: "世间万千风景,不及她浅笑倩兮,眼眸含情", from: "站长", from_who: "活力" },
        { id: 'd1', hitokoto: "我无法陪你走过往昔,但愿与你共度余生", from: "站长", from_who: "活力" },
        { id: 'd2', hitokoto: "在那个悠长的岁月里,邮件慢慢传递,而我只爱你一人", from: "站长", from_who: "活力" },
        { id: 'd3', hitokoto: "我漫步在爱的旅途,感受着温馨与浪漫,每一刻都仿佛置身于天堂之中", from: "站长", from_who: "活力" },
        { id: 'd4', hitokoto: "你是那闪耀的星光,我愿成为夜空,只为与你共度此生", from: "站长", from_who: "活力" },
        { id: 'd5', hitokoto: "你离去我不挽留,你归来,我风雨无阻都会迎接", from: "站长", from_who: "活力" },
        { id: 'd6', hitokoto: "若能深爱一个人,哪怕他满身缺点,即使他不爱我,人生也不至于是炼狱", from: "站长", from_who: "活力" },
        { id: 'd7', hitokoto: "与你相伴,不问归期,四季更迭,皆成诗篇", from: "站长", from_who: "活力" },
        { id: 'd8', hitokoto: "\"遇见你\"是命运的轻吟,\"爱上你\"是灵魂的深歌", from: "站长", from_who: "活力" },
        { id: 'd9', hitokoto: "在爱情的天平上,真心才是最重的砝码", from: "站长", from_who: "活力" },
        { id: 'd12', hitokoto: "我愿做那风,为你吹散忧愁,如同月亮守护海洋,只愿你的心永远安宁", from: "站长", from_who: "活力" },
        { id: 'd13', hitokoto: "时光流转,岁月更迭,我愿化作星辰,只盼永远照亮你的夜空", from: "站长", from_who: "活力" },
        { id: 'd14', hitokoto: "万紫千红春满园,不如你一笑倾城", from: "站长", from_who: "活力" },
        { id: 'd15', hitokoto: "月下觅你千万处,回首间,你却在,灯火阑珊", from: "站长", from_who: "活力" },

        // --- Famous Quotes (Filtered < 30 chars) ---
        { id: 'f2', hitokoto: "寂寞如影，寂寞如随，旧欢入梦，不必化解，已成共生。", from: "名言", from_who: "三毛" },
        { id: 'f4', hitokoto: "我是幸福的，因为我爱，因为我有爱。", from: "名言", from_who: "白朗宁" },
        { id: 'f5', hitokoto: "离别使爱情热烈，相逢则使它牢固。", from: "名言", from_who: "托•富勒" },
        { id: 'f7', hitokoto: "爱情，你的话是我的食粮，你的气息是我的醇酒。", from: "名言", from_who: "歌德" },
        { id: 'f8', hitokoto: "没有多少日子剩下来了，我还保留些什么？有保留的就不是爱情。", from: "名言", from_who: "亦舒" },
        { id: 'f11', hitokoto: "爱之花开放的地方，生命便能欣欣向荣。", from: "名言", from_who: "梵高" },
        { id: 'f12', hitokoto: "我们爱着的是一些人，而与我们结婚生子的又是另一些人。", from: "名言", from_who: "亦舒" },
        { id: 'f13', hitokoto: "美能激发人的感情，爱情净化人的心灵。", from: "名言", from_who: "约•德莱基" },
        { id: 'f15', hitokoto: "惆怅的青春，叛逆的岁月，发酵成一碗青绿色的草汁，倒进心脏里。", from: "名言", from_who: "郭敬明" },
        { id: 'f17', hitokoto: "被冰封的心，无止境的休眠，我在等待为我破冰的人。", from: "名言", from_who: "郭敬明" },
        { id: 'f18', hitokoto: "能够说出的委屈，便不算委屈；能够抢走的爱人，便不算爱人。", from: "名言", from_who: "亦舒" },
        { id: 'f19', hitokoto: "感情这种事，不可理喻，要爱上一个人起来，身不由主，心也不由主。", from: "名言", from_who: "亦舒" },
        { id: 'f21', hitokoto: "无论有没有人陪在你身边，你都要勇敢。", from: "名言", from_who: "郭敬明" },
        { id: 'f25', hitokoto: "大雨总是淋湿我的眼睛、我的心，淋湿我独自度过的岁月。", from: "名言", from_who: "郭敬明" },
        { id: 'f26', hitokoto: "凡是人尽可夫的女人，都挂着一个淑女的招牌。", from: "名言", from_who: "亦舒" },
        { id: 'f27', hitokoto: "喷泉的水堵不死，爱情的火扑不灭。", from: "名言", from_who: "蒙古" },
        { id: 'f28', hitokoto: "你问我爱你值不值得，其实你应该知道，爱就是不问值得不值得。", from: "名言", from_who: "张爱玲" },
        { id: 'f30', hitokoto: "爱得匆忙，散得也快。", from: "名言", from_who: "约•海伍德" }
    ],

    // 获取语录
    // 为了避免 CORS 跨域问题和提高速度，这里默认使用本地语录库
    fetch: async () => {
        return new Promise((resolve) => {
            // 模拟极短延迟，让UI动画更自然
            setTimeout(() => {
                const random = Hitokoto.fallbackQuotes[Math.floor(Math.random() * Hitokoto.fallbackQuotes.length)];
                resolve(random);
            }, 200); 
        });
    },

    // 获取问候语
    getGreeting: () => {
        const hour = new Date().getHours();
        if (hour < 6) return { text: '夜深了，早点休息' };
        if (hour < 12) return { text: '早上好，新的一天' };
        if (hour < 18) return { text: '下午好，喝杯茶吧' };
        return { text: '晚上好，享受宁静' };
    }
};
