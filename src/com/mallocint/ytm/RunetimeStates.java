package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;

@ManagedBean(name="runetimeStates")
public class RunetimeStates {

   private String colision;
   private String shape;
   public RunetimeStates() {
      this.shape= "Rect";
      this.colision= "false";
   }
   
   public String getColision() {
      return colision;
   }
   
   public void setColision(String colision) {
      this.colision = colision;
   }

   public String getShape() {
      return shape;
   }

   public void setShape(String shape) {
      this.shape = shape;
   }
   
}
