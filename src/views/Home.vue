<template>
    <div class="home">
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="手机号">
                <div class="flexBox">
                    <el-input v-model="telNum"></el-input>
                    <el-button type="primary" @click="getCheckCode" class="mar-hov-s">获取验证码</el-button>
                </div>
            </el-form-item>
            <el-form-item label="验证码">
                <div class="flexBox">
                    <el-input v-model="checkCode"></el-input>
                    <el-button type="primary" @click="getToken" class="mar-hov-s">获取token</el-button>
                </div>
            </el-form-item>
            <el-form-item label="token列表">
                <div v-for="(token, index) in tokens" :key="index" class="flexCenter">
                    <el-input :class="index != 0 ? 'pad-ver-s' : ''" v-model="tokens[index]"></el-input>
                    <i v-if="index === 0" class="el-icon-plus font-big pad-hov-s" @click="tokens.push('')"></i>
                    <i v-else class="el-icon-minus font-big pad-hov-s" @click="tokens.splice(index, 1)"></i>
                </div>

            </el-form-item>
            <el-form-item label="开始时间">
                <el-time-picker
                    v-model="startTime"
                    :picker-options="{selectableRange: '10:30:00 - 13:30:00'}"
                    placeholder="开始抢券时间">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="频率">
                <el-input-number v-model="num" :min="1" :max="5" label="每秒抢券次数"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :disabled="!!status">开始</el-button>
                <el-button @click="onCancel">暂停</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                form: {
                    name: '',
                },
                tokens: [''],
                startTime: new Date(),
                num: 1,
                status: 0,
                submitInt: 0,
                getCouponInt: 0,
                telNum: '',
                checkCode: ''
            }
        },
        methods: {
            onSubmit() {
                let _this = this;
                this.status = 1;
                this.submitInt = setInterval(() => {
                    const nowDate = new Date().getTime();
                    const startTime = _this.startTime.getTime() - 1000;
                    if (nowDate >= startTime) {
                        clearInterval(_this.submitInt);
                        this.getCouponInt = setInterval(() => {
                            this.multGetCoupon();
                        }, (1000 / this.num));
                    }
                }, 1000)
            },
            onCancel() {
                this.status = 0;
                clearInterval(this.submitInt);
                clearInterval(this.getCouponInt);
            },
            multGetCoupon() {
                let _this = this;
                this.tokens.forEach((token, index) => {
                    this.$api.GetCouponList({token}).then(res => {
                        res.data.forEach(item => {
                            this.$api.ReceivingPreferentialOffers({
                                PreferentialOffersId: item.id,
                                token: this.tokens[0]
                            }).then(res => {
                                if (res.code == 0) {
                                    _this.tokens.splice(index, 1);
                                }
                                console.log(res);
                            })
                        });
                    });
                });
            },
            getCheckCode() {
                this.$api.SendSMS({
                    mobile: this.telNum
                });
                this.$message.success("发送验证码成功！")
            },
            getToken() {
                let _this = this;
                this.$api.GetToken({
                    mobile: this.telNum,
                    code: this.checkCode
                }).then(res => {
                    if (res.code === 0) {
                        if (_this.tokens[0]) {
                            _this.tokens.push(res.data.token);
                        } else {
                            _this.tokens[0] = res.data.token;
                            _this.$set(_this.tokens,0 , res.data.token);
                        }
                        _this.$message.success("获取token成功")
                    }
                })
            },
        },
        mounted() {

        }
    }
</script>
<style scoped>
    .home {
        max-width: 500px;
        width: 100%;
    }
</style>
