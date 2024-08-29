import dayjs, { Dayjs } from "dayjs";

export const handleLegDate=(date:string,minDate:Dayjs)=>{
    if(date.includes('%2B')){  // dynamic date which used at socila media compaigns it will be like CAI-SSH/+7
      const daysToAdd = parseInt(date.split('%2B')[1]);
      return dayjs().add(isNaN(daysToAdd)? 7: daysToAdd,'days').format('YYYY-MM-DD')
    }
   else if(dayjs(date).isBefore(minDate)){
      return dayjs(minDate).add(7,'days').format('YYYY-MM-DD')
    }else{
      return date;
    }
  }
  
  
export const getLegs=(legs:any, nearbyAirportCode:string)=>{
  const legsData:any=[];
  for(let i=0;i<legs.length;i =i+2){
      legsData.push({
        origin:legs[i].split('-')[0].split('_').map((code:string)=>code.includes("current")?nearbyAirportCode: code.substring(0,3)),
        destination:legs[i].split('-')[1].split('_').map((code:string)=>code.includes("current")?nearbyAirportCode: code.substring(0,3)),
        departure: handleLegDate(legs[i+1],legsData.length ===0 ? dayjs() : dayjs(legsData[legsData.length-1]?.departure)),
      })

  }

  return legsData;
}