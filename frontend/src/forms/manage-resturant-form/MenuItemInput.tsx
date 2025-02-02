import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
            <FormMessage className="text-red-500" /> {/* Make sure error message is visible */}
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (NPR)
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="200"
                className="bg-white"
                type="number" // Ensure price is treated as a number
              />
            </FormControl>
            <FormMessage className="text-red-500" /> {/* Make sure error message is visible */}
          </FormItem>
        )}
      />
      <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit">
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
