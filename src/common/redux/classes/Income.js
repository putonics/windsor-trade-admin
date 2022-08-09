export default class Income {
    totalReferralIncome = 0
    ////////////////////////////////////////
    totalLevelIncome = 0 //upto 17th level
    ////////////////////////////////////////////
    ldbDate = 0
    ldbStar = 0
    totalLdbIncome = 0//leadership bonus
    totalLdbMonth = 0
    /////////////////////////////////////////////
    rewardsAchievedOn = []
    rewardsAchieved = 0
    totalRewards = 0
    /////////////////////////////////////////////
    worldClubAchievedOn = []
    worldClubRank = 0
    totalWorldClubIncome = 0

    constructor(i = null) {
        this.totalReferralIncome = i && i.totalReferralIncome ? i.totalReferralIncome : 0
        ///////////////////////////////////////////////////////////////////////////////////
        this.totalLevelIncome = i && i.totalLevelIncome ? i.totalLevelIncome : 0
        //////////////////////////////////////////////////////////////////////////////////
        this.ldbDate = i && i.ldbDate ? i.ldbDate : 0
        this.ldbStar = i && i.ldbStar ? i.ldbStar : 0
        this.totalLdbIncome = i && i.totalLdbIncome ? i.totalLdbIncome : 0
        this.totalLdbMonth = i && i.totalLdbMonth ? i.totalLdbMonth : 0
        //////////////////////////////////////////////////////////////////////////////////
        this.rewardsAchievedOn = i && i.rewardsAchievedOn ? i.rewardsAchievedOn : [0]
        this.rewardsAchieved = i && i.rewardsAchieved ? i.rewardsAchieved : 0
        this.totalRewards = i && i.totalRewards ? i.totalRewards : 0
        //////////////////////////////////////////////////////////////////////////////////
        this.worldClubAchievedOn = i && i.worldClubAchievedOn ? i.worldClubAchievedOn : [0]
        this.worldClubRank = i && i.worldClubRank ? i.worldClubRank : 0
        this.totalWorldClubIncome = i && i.totalWorldClubIncome ? i.totalWorldClubIncome : 0
    }

    json = () => {
        const {
            totalReferralIncome, totalLevelIncome,
            ldbDate, ldbStar, totalLdbIncome, totalLdbMonth,
            rewardsAchievedOn, rewardsAchieved, totalRewards,
            worldClubAchievedOn, worldClubRank, totalWorldClubIncome,
        } = this
        return ({
            totalReferralIncome, totalLevelIncome,
            ldbDate, ldbStar, totalLdbIncome, totalLdbMonth,
            rewardsAchievedOn, rewardsAchieved, totalRewards,
            worldClubAchievedOn, worldClubRank, totalWorldClubIncome,
        })
    }
}