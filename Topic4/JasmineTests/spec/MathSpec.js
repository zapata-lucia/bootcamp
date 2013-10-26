describe("MathAPI", function() {
  var value;

  beforeEach(function() {
  	value = 3.2;	
  });	

  describe("when we use ROUND function", function() {
  	var radix;

  	it("should return the value round using radix", function() {
  		radix = 2;
  		expect(MathAPI.round(value, radix)).toEqual(4);	
  	});
	it("should return NaN if radix is equal to 0", function() {
		radix=0;
		expect(MathAPI.round(value, radix)).toBeNaN();
	});
  });

  describe("when we use the CEIL function", function() {
  	var step;

  	it("should return the ceil of the value using step", function() {
  		step = 2;
  		expect(MathAPI.ceil(value, step)).toEqual(4);
  	});
  	it("should return NaN if step is equal to 0", function() {
  		step = 0;
  		expect(MathAPI.ceil(value, step)).toBeNaN();
  	});
  });

  describe("when we use the CLAMP function", function() {
    var min, max;

    it("should return the first value", function() {
      min = 1;
      max = 6;
      expect(MathAPI.clamp(value, min, max)).toEqual(3.2);
    });
    it("should return min, if min>value", function() {
      min = 4;
      max = 6;
      expect(MathAPI.clamp(value, min, max)).toEqual(4);
    });
    it("should return max, if val>max", function() {
      min = 1;
      max = 3;
      expect(MathAPI.clamp(value, min, max)).toEqual(3);
    });
  });

  describe("when we use the COUNTSTEPS function", function() {
    var step, overflow;

    it("should return the amount of steps to get to value", function() {
      step = 1.5;
      overflow = 0;
      expect(MathAPI.countSteps(value, step, overflow)).toEqual(2);
    });
    it("should return value module overflow", function() {
      step = 1;
      overflow = 2;
      expect(MathAPI.countSteps(value, step, overflow)).toEqual(1);
    });
     it("should return NaN if step is equal to 0", function() {
      step = 0;
      overflow = 2;
      expect(MathAPI.countSteps(value, step, overflow)).toBeNaN();
    });
  });

  describe("when we use the FLOOR function", function() {
    var step;

    it("should return the floor of value", function() {
      step = 1.5;
      expect(MathAPI.floor(value, step)).toEqual(3);
    });
    it("should return NaN if step is equal to 0", function() {
      step = 0;
      expect(MathAPI.floor(value, step)).toBeNaN();
    });
  });

  describe("when we use the INRANGE function", function() {
    var min, max, threshold;

    it("should return true, the value is in range", function() {
      min = 1;
      max = 4;
      threshold = 0.5;
      expect(MathAPI.inRange(value, min, max, threshold)).toBe(true);
    });
    it("should return false, the value is not in range", function() {
      min = 0;
      max = 2;
      threshold = 0.5;
      expect(MathAPI.inRange(value, min, max, threshold)).toBe(false);
    });
  });

  describe("when we use the LERP function", function() {
    var ratio;
    var start = 1;
    var end = 3;

    it("should return the lerp value", function() {
      ratio = 3;
      expect(MathAPI.lerp(ratio, start, end)).toEqual(7);
    });
    it("should return false, the value is not in range", function() {
      ratio = 0;
       expect(MathAPI.lerp(ratio, start, end)).toEqual(1);
    });
  });
  
  describe("when we use the LOOP function", function() {
    var min, max;

    it("should return the max value", function() {
      min = 4;
      max = 6;
      expect(MathAPI.loop(value, min, max)).toEqual(6);
    });
    it("should return the min value", function() {
      min = 2;
      max = 3;
      expect(MathAPI.loop(value, min, max)).toEqual(2);
    });
    it("should return the value", function() {
      min = 2;
      max = 4;
      expect(MathAPI.loop(value, min, max)).toEqual(3.2);
    });
  });

  describe("when we use the NORM function", function() {
    var min, max;

    it("should return the norm", function() {
      min = 2;
      max = 4;
      expect(MathAPI.norm(value, min, max)).toEqual(0.6000000000000001);
    });
    it("should return Infinity if max-min=0", function() {
      min = 3;
      max = 3;
      expect(MathAPI.norm(value, min, max)).toBe(Infinity);
    });
  });	
  			
});
