// page/join-us/join-us.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: "1990-01-01",
    today: new Date().toJSON().slice(0, 10),
    departments: ['请选择...', '财务部', '秘书部', '人力资源部', '社团部', '行政监察部',
        '公共关系部', '外联部', '媒体部', '宣传部', '思存工作室',
        '新媒体工作室', '文艺拓展部', '社团外联企划部'
    ],
    birthday: new Date(new Date().getFullYear() - 18, 0, 1) // smdsbz: assuming they are all 18-years old
                  .toJSON().slice(0, 10),
    firstChoice: 0,     // smdsbz: pass `departments[firstChoice]` to back-end
    secondChoice: 0,    //         `-1` for no second choice
  },

  /**
   * invoked when user changed pickers in front-end
   *   and YES, you have to change the displayed content **MANUALLY**
   *
   * Author:    smdsbz@GitHub.com
   *
   * Args:      e   - the picker element that triggered this event
   *
   * Return:    None
   */
  bindBirthdayChange: function (e) {
    this.setData({
        birthday: e.detail.value
    });
  },

  bindRegionChange: function (e) {
    this.setData({
        birthPlace: e.detail.value
    });
  },

  bindDepartmentChange: function (e) {
    if (this.data.firstChoice != 0  // smdsbz: HACK: Don't delete `this`!
          && e.detail.value == 0) {
      // smdsbz: you cannot choose ‘请选择...’ again, once you chose sth. else
      return;
    }
    this.setData({
        firstChoice: e.detail.value
    });
  },

  /**
   * submit to back-end data server
   *   NOTE: We don't have a data server at the time
   *   TODO: Apply for a new server after MVP is shown
   *
   * Author:    smdsbz@GitHub
   *
   * Args:      e   - the form that is being submitted
   *
   * Return:    form data in JSON
   */
  submitApplicantionForm: function (e) {
    var formdata = e.detail.value;
    console.log(formdata);
    // Data legality checks
    // - empty name field
    // ADDITIONAL: Regexp check
    if (formdata["name"].length === 0) {
      wx.showModal({
        title: "信息不完整",
        content: "请填写您的姓名！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;
    }
    // - refuse to give gender
    if (formdata["gender"].length === 0) {
      wx.showModal({
        title: "信息不完整",
        content: "请填写您的性别！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;
    }
    // - refuse to provide tel.
    if (formdata["mobile"].length === 0) {
      wx.showModal({
        title: "信息不完整",
        content: "请填写您的手机号码！我们将以短信的形式通知您面试地点！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;
    }
    // - choose one department at least
    if (formdata["first-department-choice"] === 0) {
      wx.showModal({
        title: "信息不完整",
        content: "请选择您要加入的部门！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;
    }
    // - if chose alternative department
    if (formdata["allow-alternative-department"] === true
          && formdata["second-department-choice"] === 0) {
      wx.showModal({
        title: "信息不完整",
        content: "请选择您的备选部门！\n或者取消勾选「是否服从调剂」！",
        showCancel: false,
        confirmText: "回去修改"
      });
      return;
    }
    console.log("Legit data! POST to back-end data server");
  },

  bindAlterChange: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
