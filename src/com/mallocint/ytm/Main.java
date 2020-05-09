package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "main")
@RequestScoped
public class Main {

   private Boolean isQuestionRendered = false;

   public Main() {}

   public Boolean getIsQuestionRendered() {
      return isQuestionRendered;
   }

   public void setIsQuestionRendered(Boolean isQuestionRendered) {
      this.isQuestionRendered = !isQuestionRendered;
   }

}
