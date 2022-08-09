import { api } from "../classes/CryptoServer";
import User from "../classes/User";

/**
 * @param {User} user 
 * @param {({ email: string, requestid: string, otp: string })=>{}} onComplete 
 */
export const sendOtp = async (user, onComplete = () => null) => {
    if (!user) return null
    try {
        const { email, requestid, otp } = await api('/send-otp', new User(user).json())
        onComplete({ email, requestid, otp })
        return ({ email, requestid, otp })
    } catch (e) {
        return null
    }
}