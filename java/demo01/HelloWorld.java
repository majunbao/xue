import java.util.*;

public class HelloWorld {
  public static void main(String[] args) {
    ArrayList<Map> list = new ArrayList<Map>();
    Map<String, String> m1 = new HashMap<String, String>();
    m1.put("niha", "9");
    m1.put("key", "v");
    list.add(m1);
    System.out.println(list);
  }
}
