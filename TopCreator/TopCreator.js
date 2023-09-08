import axios from "axios";
export async function getRandomImage() {
  try {
    const response = await axios.get("https://source.unsplash.com/random"); // Replace with your desired API endpoint
    const imageUrl = response.request.responseURL;
    return imageUrl;
  } catch (error) {
    console.log(error);
    console.error("Error fetching random image:", error);
    return null;
  }
}
export const getTopCreators = (creators) => {
  // if(!creators) return [];
  const finalCreators = [];

  const finalResult = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );

    return index;
  }, {});
  const img = Object.entries(finalResult).forEach(async (item) => {
    // const background = await getRandomImage();
    // console.log("img", background);
    const seller = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    finalCreators.push({ seller, total });
  });
  return finalCreators;
};
