// const processOrderNotWorking_ehandling = (orderId) => {
//   if (!orderId) {
//     console.log("Invalid order ID", orderId);
//     throw new Error("Invalid order ID");
//   }

//   let orderDetails;


// };

// As you can see this code did not behave as expected
// let initOrderId_1 = 100;
// const newOrder_1 = processOrderNotWorking_ehandling(initOrderId_1);
// // console.log("Order details:", newOrder_1);

// // --------------------------------------------------------------------
// // PROMISES
// // --------------------------------------------------------------------

// //TODO: How many parameters should this function take?
const processOrderPromise = (orderId) => {
  //TODO: Implement a function using a promises to fetch order details and return the order after fetching [2 Marks]
  //TODO: Handle invalid order ID [1 Mark]

  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log("Fetching order details for order ID:", orderId);
      if(orderId)
      {
        resolve( { orderId, status: "Processed" })
      }
      else
      {
        reject(new Error('Error'))
      }
    }, 1000);
  })
 
};
processOrderPromise(100)
  .then((data) => {console.log('call back call: ',data)})
  .catch((e) => console.log(e,'err'));





// //TODO: Call processOrderPromise() properly to console log the returned order details and catch any errors [1 Mark]


const processOrderAwait = async (orderId)=>{
try {
  const data=await processOrderPromise(orderId);
  console.log('async call: ',data)
  return data
} 
catch (error)
{
  console.log(error);
}
};

processOrderAwait(100)


// const processOrderNotWorking = (orderId) => {
//   if (!orderId) {
//     console.log("Invalid order ID", orderId);
//     return;
//   }
//   let orderDetails;
//   setTimeout(() => {
//     console.log("Fetched order details for order ID:", orderId);
//     orderDetails = { orderId, status: "Processed" };
//   }, 1000);

//   return orderDetails;
// };

// // // As you can see this code did not behave as expected
// let initOrderId = 100;
// const newOrder = processOrderNotWorking(initOrderId);
// console.log("Order details:", newOrder);

// // // --------------------------------------------------------------------
// // // PROMISES
// // // --------------------------------------------------------------------

// const processOrderAwait = async (orderId) => {
//   //Handle error [1 Mark]
//   //[HINT]: Use the promise from processOrderPromise [1 Mark]
//   //[NOTE]: You do not have to return any value, console log here
// };

// // //TODO: Call processOrderAwait()
