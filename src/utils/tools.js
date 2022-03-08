export default {
    category(category_id) {
        switch (category_id) {
            case 1: return "精品小说";
            case 2: return "历史"
            case 3: return "文学"
            case 4: return "艺术"
            case 5: return "人物传记"
            case 6: return "哲学宗教"
            case 7: return "计算机"
            case 8: return "心理"
            case 9: return "社会文化"
            case 10: return "个人成长"
            case 11: return "经济理财"
            case 12: return "政治军事"
            case 13: return "童书"
            case 14: return "教育学习"
            case 15: return "科学科技"
            case 16: return "生活百科"
        }
    },

    category_id(category) {
        switch (category) {
            case "精品小说": return 1
            case "历史": return 2
            case "文学": return 3
            case "艺术": return 4
            case "人物传记": return 5
            case "哲学宗教": return 6
            case "计算机": return 7
            case "心理": return 8
            case "社会文化": return 9
            case "个人成长": return 10
            case "经济理财": return 11
            case "政治军事": return 12
            case "童书": return 13
            case "教育学习": return 14
            case "科学科技": return 15
            case "生活百科": return 16
        }
    }
}