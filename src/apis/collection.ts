import { NTCoreWrapper } from "@/common/session";

export class NTQQCollectionApi {
    private core: NTCoreWrapper;
    constructor(core: NTCoreWrapper) {
        this.core = core;
    }
    async createCollection(authorUin: string, authorUid: string, authorName: string, brief: string, rawData: string) {
        let param = {
            commInfo: {
                bid: 1,
                category: 2,
                author: {
                    type: 1,
                    numId: authorUin,
                    strId: authorName,
                    groupId: '0',
                    groupName: '',
                    uid: authorUid
                },
                customGroupId: '0',
                createTime: Date.now().toString(),
                sequence: Date.now().toString()
            },
            richMediaSummary: {
                originalUri: '',
                publisher: '',
                richMediaVersion: 0,
                subTitle: '',
                title: '',
                brief: brief,
                picList: [],
                contentType: 1
            },
            richMediaContent: {
                rawData: rawData,
                bizDataList: [],
                picList: [],
                fileList: []
            },
            need_share_url: false
        };
        return this.core.session.getCollectionService().createNewCollectionItem(param);
    }
    async getAllCollection(category: number = 0, count: number = 50) {
        let param = {
            category: category,
            groupId: -1,
            forceSync: true,
            forceFromDb: false,
            timeStamp: "0",
            count: count,
            searchDown: true
        };
        return this.core.session.getCollectionService().getCollectionItemList(param);
    }
}
