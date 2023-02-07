import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";

/**
 * Displays the notable residents of a planet
 * @param {string} planet: single object
 */
export default function NotableResidents({ planet }) {
  return (
    <td>
      {planet.residents.map((resident, i) => {
        let genderIcon = <FaGenderless title="Gender N/A" />;

        // gender to FA icon converter
        switch (resident.gender) {
          case "male":
            genderIcon = <FaMale title="Male" />;
            break;
          case "female":
            genderIcon = <FaFemale title="Female" />;
            break;
          default:
            genderIcon = <FaGenderless title="Gender N/A" />;
            break;
        }

        let person = Object.values(resident);
        person.pop(); // remove gender text value

        return (
          <p key={i}>
            {genderIcon} {person.join(", ")}
          </p>
        );
      })}
    </td>
  );
}
