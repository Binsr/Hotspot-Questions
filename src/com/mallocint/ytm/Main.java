package com.mallocint.ytm;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;

@ManagedBean(name="main")
@RequestScoped
public class Main {
   @ManagedProperty(value="#{runetimeStates}")
   RunetimeStates states;
   
   public Main() {}

   public RunetimeStates getStates() {
      return states;
   }

   public void setStates(RunetimeStates states) {
      this.states = states;
   }
    
}
