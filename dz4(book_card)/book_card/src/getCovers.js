import getLinksToCovers from "./getLinksToCovers";

async function getCovers() {
  let links_to_covers = await getLinksToCovers();
  let covers = [];
  for (let link of links_to_covers) {
    let response = await fetch(link);
    if (response.ok) {
      let cover = await response.blob();
      covers.push(cover);
    }
  }
  return covers;
}

export default getCovers;