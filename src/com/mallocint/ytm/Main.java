package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "main")
@RequestScoped
public class Main {

   private Boolean isQuestionRendered = false;
   private Boolean questionBtnRender  = true;

   public Main() {}

   public Boolean getIsQuestionRendered() {
      return isQuestionRendered;
   }

   public void questionRender() {
      this.isQuestionRendered = !this.isQuestionRendered;
      this.questionBtnRender = false;
   }

   public Boolean getQuestionBtnRender() {
      return questionBtnRender;
   }

   public void questionBtnRender() {
      this.questionBtnRender = !this.questionBtnRender;
   }

}
