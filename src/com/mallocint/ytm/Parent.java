package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "parent")
@RequestScoped
public class Parent {

   private Child chil;

   public Parent() {}

   public Child getChil() {
      if (chil == null)
         chil = new Child();
      return chil;
   }

   public void setChil(Child chil) {
      this.chil = chil;
   }

}
