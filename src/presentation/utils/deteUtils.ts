// Add date utility function
export const calculateTimeUntilAuction = (auctionDateTime: string): { days: number; hours: number } => {
 const auctionDate = new Date(auctionDateTime.replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1-$2-$3'));
 const currentDate = new Date();
 
 const differenceInMs = auctionDate.getTime() - currentDate.getTime();
 const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
 const differenceInHours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 
 return {
 days: Math.max(0, differenceInDays),
 hours: Math.max(0, differenceInHours)
 };
};