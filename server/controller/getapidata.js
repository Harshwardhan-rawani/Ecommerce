const axios = require('axios');
const getapidata = async(req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/products-by-category',
  params: {
    category_id: '',
    page: '1',
    country: 'US',
    sort_by: 'RELEVANCE',
    product_condition: 'ALL'
  },
        headers: {
          'x-rapidapi-key': '396a8588efmshc477f80a8d493b6p1d62cbjsn9150376b2987',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          return res.json(response.data)
      } catch (error) {
          console.error("error");
      }
}

module.exports = {getapidata}