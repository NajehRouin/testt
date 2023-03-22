const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({

nom:{
    type:String,
    rquired:true
}
,

bureau:[{
    b1:{
        nom:{type:String},
        code:{type:String,unique:true},
        isActive:{
            type:Boolean,
            default:false},
        droite:[],
        gauche:[],
        extD: {type:String},
        extG:{type:String},
    },
    b2:{

        nom:{type:String},
        code:{type:String,unique:true},
        isActive:{ type:Boolean, default:false},

        extD:{type:String},
        extG: {type:String},
        linkD:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }],
        linkG:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users",
            }
        ]

    },
    b3:{
        nom:{type:String},
        code:{type:String,unique:true},
        isActive:{
            type:Boolean,
            default:false},
            extD: {type:String},
            extG:{type:String},
         linkD:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }],
        linkG:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        }]
    }
}]

})

module.exports=mongoose.model('Users',UserSchema)