const { Music, Movie, Sentence } = require('./classic');

class Art {
  static async getData(art_id, type) {
    let art = null;
    const finder = {
      where: {
        id: art_id
      }
    };
    switch (type) {
      case 100:
        art = await Movie.findOne(finder);
        break;
      case 200:
        art = await Music.findOne(finder);
        break;
      case 300:
        art = await Sentence.findOne(finder);
        break;
      default:
    }
    return art;
  }

  // static async increment(art_id, type) {
  //   const art = await Art.findOne({ where: { art_id, type } });
  //   return art.increment('fav_nums', { by: 1 });
  // }

  // static async decrement(art_id, type) {
  //   const art = await Art.findOne({ where: { art_id, type } });
  //   return art.decrement('fav_nums', { by: 1 });
  // }
}

module.exports = { Art };
