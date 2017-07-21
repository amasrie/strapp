(function () {
  'use strict';

  angular.module('app')
    .service('appService', function () {

      var myDate = new Date();
      var minDate = new Date(
        myDate.getFullYear() - 200,
        myDate.getMonth(),
        myDate.getDate());
      var maxDate = function (relationId) {
        if (relationId == 1) {
          return new Date(
            myDate.getFullYear() - 18,
            myDate.getMonth(),
            myDate.getDate());
        } else {
          return new Date(
            myDate.getFullYear(),
            myDate.getMonth(),
            myDate.getDate());
        }
      }

      var getType = function (index, tipoTel, phones) {
        for (var k in tipoTel) {
          if (tipoTel[k].gid == phones[index].type) {
            return tipoTel[k].name;
          }
        }
      }

      var getCode = function(index, codTel, phones){
        for (var k in codTel) {
          if (codTel[k].telephonecodeid == phones[index].code) {
            return codTel[k].telephonecode;
          }
        }
      }

      var updatePhoneList = function (view, tipoTel, phones, codTel) {
        console.log(phones);
        $(view + ' .phone-result').remove();
        var list = [];
        for (var i = 0; i < phones.length; i++) {
          var name = getType(i, tipoTel, phones);
          var code = getCode(i, codTel, phones);
          var elem = '<div class="phone-result input-group phone-input phone phoneMargin">' +
            '<div class="row phone">' +
            '<div class="col-md-2">' +
            '<span class="input-group-type">' +
            name +
            '</span>' +
            '</div>' +
            '<div class="col-md-3">' +
            '<span class="input-group-type">' +
            code +
            '</span>' +
            '</div>' +
            '<div class="col-md-4">' +
            '<span class="input-group-tel">' +
            phones[i].number +
            '</span>' +
            '</div>' +
            '<div class="col-md-2">' +
            '<a href ng-hide="isDisabled()" class="btn-remove-phone" title="Eliminar" ng-click="removePhone(' + i + ')"><i class="zmdi zmdi-delete zmdi-hc-lg"></i></a>' +
            '</div>' +
            '</div>' +
            '</div>'
          list.push(elem);
        }
        return list;
      }

      var updateSpecialtyList = function(specialties){
        $(' .specialty-result').remove();
        var list = [];
        for (var i = 0; i < specialties.length; i++) {
          var elem = '<div class="specialty-result input-group specialty-input phone specialtyListMargin">' +
            '<div class="row"><div class="col-md-11">' +
            '<span class="input-group-tel">' +
            specialties[i].name +
            '</span>';
            for(var j = 0; j < specialties[i].categories.length; j++){
              elem += '<p class="padding_left">'+specialties[i].categories[j].label+'</p>';
            }
            elem += '</div><div ng-if="model.role==1" ng-hide="isDisabled()" class="col-md-1"><a href class="btn-remove-specialty" title="Eliminar" ng-click="removeSpecialty(' + i + ')"><i class="zmdi zmdi-delete zmdi-hc-lg"></i></a></div>';
            elem += '</div></div>' +
            '</div>' +
            '</div>';
          list.push(elem);
        }
        return list;
      }

      var addPhone = function (userPhone) {
        if (userPhone.type && userPhone.number && userPhone.code) {
          $("#phoneType").removeClass("profile_required");
          var tel = {};
          tel.type = userPhone.type;
          tel.number = userPhone.number;
          tel.code = userPhone.code;
          return tel;

        } else {
          $("#phoneType").addClass("profile_required");
        }
      }

      var specialtyListElemRepeated = function(list, name, id){
        for(var i = 0; i < list.length; i++){
          if(list[i].name == name && list[i].gid == id){
            return i;
          }
        }
        return null;
      }

      return {
        initDatepicker: function(){
          angular.element(".md-datepicker-button").each(function(){
            var el = this;
            var ip = angular.element(el).parent().find("input").bind('click', function(e){
              angular.element(el).click();
            });
            angular.element(this).css('visibility', 'hidden');
            angular.element(this).css('display', 'none');
          });
        },
        minDate : minDate,
        maxDate : function(relationId){
          return maxDate(relationId);
        },
        updatePhoneList: function(view, tipoTel, phones, codTel){
          return updatePhoneList(view, tipoTel, phones, codTel);
        },
        addPhone: function (userPhone) {
          return addPhone(userPhone);
        },
        getType: function (index, tipoTel, phones) {
          return getType(index, tipoTel, phones);
        },
        getCode: function (index, codeTel, phones) {
          return getCode(index, codeTel, phones);
        },
        processPhones: function (data, tipoTel) {
          var list = [];
          for (var i = 0; i < data.length; i++) {
            var tlf = {};
            tlf.type = data[i].telephone_type;
            tlf.code = data[i].telephonecodeid;
            for (var k = 0; k < tipoTel.length; k++) {
              if (tipoTel[k].name == tlf.type) {
                tlf.type = tipoTel[k].gid;
                break;
              }
            }
            tlf.number = data[i].telephone_number;
            list.push(tlf);
          }
          return list;
        },
        processSpecialties: function(data){
          var list = [];
          for (var i = 0; i < data.length; i++) {
            var pos = specialtyListElemRepeated(list, data[i].specialty, data[i].specialtyid);
            var json = {};
            if(data[i].consultation_categoryid == 1){
              json = {category: data[i].consultation_category, id: data[i].consultation_typeid, label: data[i].consultation_type, option: data[i].consultation_type};
            }else{
              json = {category: data[i].consultation_category, id: data[i].consultation_typeid, label: data[i].consultation_category+": "+data[i].consultation_type, option: data[i].consultation_type};
            }
            if(pos != null){
              list[pos].categories.push(json);
            }else{
              var specialty = {};
              specialty.name = data[i].specialty;
              specialty.gid = data[i].specialtyid;
              specialty.categories = [];
              specialty.categories.push(json);
              list.push(specialty);
            }
          }
          return list;
        },
        updateSpecialtyList: function(specialties){
          return updateSpecialtyList(specialties);
        }

      };

    });

})();
