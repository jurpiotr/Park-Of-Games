module.exports = {

  dateRange: (days) => {
    const set0 = (val) => {
      if (val < 10) {
        return (val = "0" + val);
      } else {
        return val;
      }
    };
    
    const formatDate = (date) => {
      return `${date.getFullYear()}-${
        set0(date.getMonth() + 1)
      }-${set0(date.getDate())}`
    }

    const date = new Date();
    const date1 = formatDate(date);
    const prevTime = new Date(Date.parse(date1) - 1000 * 60 * 60 * 24 * days);
    const date2 = formatDate(prevTime);
    const queryTime = `${date2},${date1}`;
    return queryTime;
  },

  dataNum: (url) => {
    const index = url.indexOf('page=') + 5;
    console.log(index);
    const extract = url.slice(index, index + 2);
    return parseInt(extract[1]) ? extract : extract[0];
  }
}

