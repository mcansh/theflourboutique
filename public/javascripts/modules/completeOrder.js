import axios from 'axios';

function completeOrder(e) {
  e.preventDefault();
  axios
    .post(this.action)
    .then(res => {
      const isDone = this.classList.toggle('checked');
      console.log(isDone);
    })
    .catch(err => console.error(err))

}

export default completeOrder;
