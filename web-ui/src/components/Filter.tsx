import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Filter = {
  data: any;
  selectedCity: string | undefined;
  setSelectedCity: any;
  isDataLoading: boolean;
};

function Filter({
  data,
  selectedCity,
  setSelectedCity,
  isDataLoading,
}: Filter) {
  const handleCityChange = (value: string) => setSelectedCity(value);

  return (
    <div className="flex w-full mdmax:flex-col justify-center px-8 mdmax:px-0 mdmax:items-start items-center">
      <Label htmlFor="filter" className="mr-4 mdmax:mr-0 mdmax:mb-2">
        Şehir
      </Label>
      <Select
        disabled={isDataLoading}
        value={selectedCity}
        onValueChange={handleCityChange}
      >
        <SelectTrigger
          id="filter"
          className="max-w-[20rem] mdmax:max-w-[100%] w-full"
          aria-controls="radix-:R1mcq:"
        >
          <SelectValue placeholder="Şehir seçiniz" />
        </SelectTrigger>
        <SelectContent className="h-full max-h-[20rem]">
          <SelectItem value="All">Tümü</SelectItem>
          {data && (
            <>
              {Object.keys(data).map((city, index) => (
                <SelectItem key={index} value={city}>
                  {city}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
