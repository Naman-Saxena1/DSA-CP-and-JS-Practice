let calc = {
    total: 0,

    add: function (x) {
      this.total = this.total + x;
      return this;
    },

    multiple: function (x) {
      this.total = this.total * x;
      return this;
    },

    sub: function (x) {
      this.total = this.total - x;
      return this;
    }
};

const result = calc.add(10).multiple(5).sub(4).add(5);
console.log(result.total);