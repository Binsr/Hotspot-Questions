import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

/* Za vezbu */

@RequestScoped
@ManagedBean
public class RunetimeStates {

   private String shape;
   private String colision;

   public RunetimeStates() {
      this.shape = "Rect";
      this.colision = "false";
   }

   public String getShape() {
      return shape;
   }

   public void setShape(String shape) {
      this.shape = shape;
   }

   public void update() {
      this.shape = "Drugo";
   }

   public String getColision() {
      return colision;
   }

   public void setColision(String colision) {
      this.colision = colision;
   }

   public void change(String shape) {
      this.shape = shape;
   }

}
