import axios from 'axios';

function completeOrder(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then((res) => {
      const isDone = this.closest('.order').classList.toggle('checked');
      console.log(res.data);
    })
    .catch(err => console.error(err));
}

export default completeOrder;
