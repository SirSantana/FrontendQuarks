import { Colors } from "./colors";

export const Buttons={
    primary:{
        height:50, backgroundColor:Colors.primary, borderRadius:10, color:'white', alignItems:'center', justifyContent:'center'
    },
    primaryOutlined:{
        height:50, borderColor:Colors.primary, borderRadius:10, color:Colors.primary, alignItems:'center', justifyContent:'center'
    },
    secondary:{
        height:50, backgroundColor:Colors.secondary, borderRadius:10, color:'white', alignItems:'center', justifyContent:'center'
    },
    withoutBorder:{
        height:50, borderRadius:10,justifyContent:'center', alignItems:'center'
    }
}