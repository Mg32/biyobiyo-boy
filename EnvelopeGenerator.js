
function EnvelopeGenerator() {
    this.attackTime   = 0;
    this.attackValue  = 1;
    this.decayTime    = 2;
    this.sustainValue = 0.2;
    this.releaseTime  = 0.1;
}
EnvelopeGenerator.prototype.trigger = function(time, duration) {
    var start = time;
    this.param.cancelScheduledValues(start);
    this.param.setValueAtTime(0, start);
    this.param.linearRampToValueAtTime(this.attackValue, start + this.attackTime);
    if (duration > this.decayTime) {
        this.param.linearRampToValueAtTime(this.sustainValue, start + this.attackTime + this.decayTime);
        this.param.linearRampToValueAtTime(this.sustainValue, start + this.attackTime + duration);
    }
    else {
        var endvalue = this.sustainValue; // TODO
        this.param.linearRampToValueAtTime(endvalue, start + this.attackTime + duration);
    }
    this.param.linearRampToValueAtTime(0, start + this.attackTime + duration + this.releaseTime);
};
EnvelopeGenerator.prototype.connect = function(param) {
    this.param = param;
};
