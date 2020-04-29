import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.event.FacesEvent;

@RequestScoped
@ManagedBean
public class RunetimeStates {
   
   private String shape= "nothing";
   private String colision;
   
   public RunetimeStates() {
      this.shape= "nothing";
   }

   public String getShape() {
      return shape;
   }

   public void setShape(FacesEvent event) {
      this.shape = event.getComponent().toString();
   }
   
   public void update() {
      this.shape= "Drugo";
   }

   public String getColision() {
      return colision;
   }

   public void setColision(String colision) {
      this.colision = colision;
   }
   public void change(String shape) {
      this.shape= shape;
   }

   
}
