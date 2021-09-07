const About = require('../../models/About');
const checkAuth = require('../../utils/check-auth');

module.exports = {
    
    Query: {
        async getAbout(_, {aboutId}) {
            try {
                const about = await About.findById(aboutId);
                if(about){
                    return about;
                }
                else {
                    throw new Error('About is Empty!');
                }

            }

            catch(err){
                throw new Error(err);
            }
        }
    },

    Mutation : {
        async createAbout(_, { aboutBody }, context) {
            const user = checkAuth(context);

            if(aboutBody.trim() === ''){
                throw new Error('About me is empty');
            }

            const newAbout = new About({
                aboutBody,
                user: user.id,
                username:user.username,
            });

            const about = await newAbout.save();
            return about;
        },
    }
}