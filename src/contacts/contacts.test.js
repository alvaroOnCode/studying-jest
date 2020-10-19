/**
 * Controller | Contact
 */
import contacts from './contacts'

/**
 * Utils | People JSON
 */
import people from '../utils/people'

/**
 * Init tests
 */
const expect = global.expect

describe('contacts', () => {
  // Tests | Adding contact
  describe('add', () => {
    // Restart contacts before run tests
    beforeEach(() => contacts.reset())

    // 1️⃣
    test('Pass if adding a contact with correct props { name, email, id }.', () => {
      const person = people[0]

      contacts.add(person)

      const current = contacts.get()

      const expected = [person]

      expect(current).toEqual(expected)
    })

    // 2️⃣
    test('Pass if throw error because pending props.', () => {
      const person = {
        name: 'Álvaro',
        email: 'alvaro@wedwedweddings.com',
      }

      expect(() => contacts.add(person)).toThrow('⛔ Invalid format.')
    })
  })

  // Tests | Deleting contact
  describe('delete', () => {
    beforeEach(() => {
      // Restart contacts before run tests
      contacts.reset()

      // Fill contacts with inner method 'add'
      people.forEach((person) => contacts.add(person))
    })

    // 1️⃣
    test('Pass if deleting the first contact in array by id.', () => {
      contacts.delete(0)

      const current = contacts.get()

      const expected = [people[1], people[2]]

      expect(current).toEqual(expected)
    })

    // 2️⃣
    test('Pass if not deleting contact because not found.', () => {
      contacts.delete(9)

      const current = contacts.get()

      const expected = people

      expect(current).toEqual(expected)
    })
  })

  // Tests | Getting data from API
  describe('From API', () => {
    // 1️⃣
    test('Pass if users exist', async () => {
      const url = "https://jsonplaceholder.typicode.com/users";
      const count = await contacts.getFromJSONPlaceholder(url);
      expect(count).toBeGreaterThan(0);
    })

    // 2️⃣
    test("Pass if input url is wrong", async () => {
      const url = "https://jsonplaceholder.typicode.com/uusseerrss";
      const count = contacts.getFromJSONPlaceholder(url);
      await expect(count).rejects.toMatch('Not Found');
    })
  })
})
