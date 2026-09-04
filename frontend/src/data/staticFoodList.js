/**
 * staticFoodList.js
 *
 * All static menu items normalised to match the backend document shape:
 *   { _id, name, description, price (Number), category, image (src), isStatic }
 *
 * `isStatic: true` tells the image renderer to use `item.image` directly
 * instead of prefixing with `${url}/images/`.
 *
 * `_id` uses a stable string so the cart reducer can track them the same way
 * it tracks MongoDB _id strings.
 */

import EggsBenedict           from '../assets/EggsBenedict.png';
import AvocadoToast            from '../assets/AvocadoToast.png';
import PancakeswithMapleSyrup  from '../assets/PancakeswithMapleSyrup.png';
import FruitSmoothieBowl       from '../assets/FruitSmoothieBowl.png';
import BananaToast             from '../assets/BananaToast.png';
import BagelSmash              from '../assets/BagelSmash.png';
import FruitWaffle             from '../assets/FruitWaffle.png';
import FrenchToast             from '../assets/FrenchToast.png';
import BreakfastBurrito        from '../assets/BreakfastBurrito.png';
import BagelwithLox            from '../assets/BagelwithLox.png';
import GranolaParfait          from '../assets/GranolaParfait.png';
import SunnyOats               from '../assets/SunnyOats.png';

import ChickenCaesarSalad      from '../assets/ChickenCaesarSalad.png';
import ClubSandwich            from '../assets/ClubSandwich.png';
import VeggieWrap              from '../assets/VeggieWrap.png';
import GrilledCheeseSandwich   from '../assets/GrilledCheeseSandwich.png';
import GrilledSalmonBowl       from '../assets/GrilledSalmonBowl.png';
import SpicyBeefTacos          from '../assets/SpicyBeefTacos.png';
import SushiCombo              from '../assets/SushiCombo.png';
import RedChickenCurry         from '../assets/RedChickenCurry.png';
import TurkeyPanini            from '../assets/TurkeyPanini.png';
import QuinoaSalad             from '../assets/QuinoaSalad.png';
import PastaSalad              from '../assets/PastaSalad.png';
import FishTacos               from '../assets/FishTacos.png';

import GrilledRibeyeSteak      from '../assets/GrilledRibeyeSteak.png';
import SalmonFillet            from '../assets/SalmonFillet.png';
import RoastChicken            from '../assets/RoastChicken.png';
import PastaPrimavera          from '../assets/PastaPrimavera.png';
import ChickenParmesan         from '../assets/ChickenParmesan.png';
import PestoPastaWithShrimp    from '../assets/PestoPastaWithShrimp.png';
import GarlicButterLambChops   from '../assets/GarlicButterLambChops.png';
import VegetarianStuffedPeppers from '../assets/VegetarianStuffedPeppers.png';
import BeefBourguignon         from '../assets/BeefBourguignon.png';
import VegetableStirFry        from '../assets/VegetableStirFry.png';
import ShrimpScampi            from '../assets/ShrimpScampi.png';
import LambChops               from '../assets/LambChops.png';

import TacosalPastor           from '../assets/TacosalPastor.png';
import ChickenQuesadilla       from '../assets/ChickenQuesadilla.png';
import Enchiladas              from '../assets/Enchiladas.png';
import Fajitas                 from '../assets/Fajitas.png';
import ChilesRellenos          from '../assets/ChilesRellenos.png';
import MolePoblano             from '../assets/MolePoblano.png';
import PozoleRojo              from '../assets/PozoleRojo.png';
import Churros                 from '../assets/Churros.png';
import Nachos                  from '../assets/Nachos.png';
import Burrito                 from '../assets/Burrito.png';
import Tamales                 from '../assets/Tamales.png';
import Chilaquiles             from '../assets/Chilaquiles.png';

import SpaghettiCarbonara      from '../assets/SpaghettiCarbonara.png';
import Lasagna                 from '../assets/Lasagna.png';
import Risotto                 from '../assets/Risotto.png';
import MargheritaPizza         from '../assets/MargheritaPizza.png';
import PenneArrabbiata         from '../assets/PenneArrabbiata.png';
import CapreseSalad            from '../assets/CapreseSalad.png';
import EggplantParmesan        from '../assets/EggplantParmesan.png';
import FocacciaBread           from '../assets/FocacciaBread.png';
import FettuccineAlferdo       from '../assets/FettuccineAlferdo.png';
import PestoPasta              from '../assets/PestoPasta.png';
import Gnocchi                 from '../assets/Gnocchi.png';
import OssoBuco                from '../assets/OssoBuco.png';

import TiramisuCake            from '../assets/TiramisuCake.png';
import Gelato                  from '../assets/Gelato.png';
import Cannoli                 from '../assets/Cannoli.png';
import PannaCotta              from '../assets/PannaCotta.png';
import Pavlova                 from '../assets/Pavlova.png';
import ChocolateLavaCake       from '../assets/ChocolateLavaCake.png';
import Baklava                 from '../assets/Baklava.png';
import StrawberryShortcake     from '../assets/StrawberryShortcake.png';
import Cheesecake              from '../assets/Cheesecake.png';
import ChocolateMousse         from '../assets/ChocolateMousse.png';
import Profiteroles            from '../assets/Profiteroles.png';
import RicottaPie              from '../assets/RicottaPie.png';

import IcedLatte               from '../assets/IcedLatte.png';
import Mojito                  from '../assets/Mojito.png';
import Smoothie                from '../assets/Smoothie.png';
import IcedTea                 from '../assets/IcedTea.png';
import MochaFrappuccino        from '../assets/MochaFrappuccino.png';
import GreenTeaSmoothie        from '../assets/GreenTeaSmoothie.png';
import CaramelMacchiato        from '../assets/CaramelMacchiato.png';
import StrawberryMilkshake     from '../assets/StrawberryMilkshake.png';
import Lemonade                from '../assets/Lemonade.png';
import Espresso                from '../assets/Espresso.png';
import Margarita               from '../assets/Margarita.png';
import Cappuccino              from '../assets/Cappuccino.png';

// Helper — builds a normalised item object
const s = (_id, name, description, price, category, image) => ({
    _id,
    name,
    description,
    price: Number(price),
    category,
    image,       // already a resolved import URL for static items
    isStatic: true,
});

const staticFoodList = [
    // ── Breakfast ────────────────────────────────────────────────────────────
    s('static-breakfast-1',  'Eggs Benedict',           'Poached eggs over toasted English muffins with hollandaise sauce.',  80,  'Breakfast', EggsBenedict),
    s('static-breakfast-2',  'Avocado Toast',            'Toasted bread topped with smashed avocado and spices.',              70,  'Breakfast', AvocadoToast),
    s('static-breakfast-3',  'Pancakes with Maple Syrup','Fluffy pancakes drizzled with pure maple syrup.',                   60,  'Breakfast', PancakeswithMapleSyrup),
    s('static-breakfast-4',  'Fruit Smoothie Bowl',      'A bowl full of fresh fruits blended into a refreshing smoothie.',   90,  'Breakfast', FruitSmoothieBowl),
    s('static-breakfast-5',  'Sunny Oats',               'Creamy oatmeal swirled with cinnamon and honey.',                   65,  'Breakfast', SunnyOats),
    s('static-breakfast-6',  'Banana Toast',             'Toast topped with peanut butter and banana slices.',                60,  'Breakfast', BananaToast),
    s('static-breakfast-7',  'Bagel Smash',              'Toasted bagel with cream cheese and smoked salmon.',                80,  'Breakfast', BagelSmash),
    s('static-breakfast-8',  'Fruit Waffle',             'Crispy waffle topped with strawberries and whipped cream.',         75,  'Breakfast', FruitWaffle),
    s('static-breakfast-9',  'French Toast',             'Classic French toast served with powdered sugar and berries.',      87,  'Breakfast', FrenchToast),
    s('static-breakfast-10', 'Breakfast Burrito',        'Eggs, cheese, and veggies wrapped in a soft tortilla.',             99,  'Breakfast', BreakfastBurrito),
    s('static-breakfast-11', 'Bagel with Lox',           'Toasted bagel topped with smoked salmon, cream cheese, and capers.',10, 'Breakfast', BagelwithLox),
    s('static-breakfast-12', 'Granola Parfait',          'Layers of granola, yogurt, and fresh berries.',                    75,  'Breakfast', GranolaParfait),

    // ── Lunch ────────────────────────────────────────────────────────────────
    s('static-lunch-1',  'Chicken Caesar Salad',   'Crisp romaine with grilled chicken, parmesan, and Caesar dressing.',      199, 'Lunch', ChickenCaesarSalad),
    s('static-lunch-2',  'Club Sandwich',           'Triple-decker sandwich with turkey, bacon, and fresh veggies.',          150, 'Lunch', ClubSandwich),
    s('static-lunch-3',  'Veggie Wrap',             'A wrap filled with a mix of seasonal vegetables and hummus.',            109, 'Lunch', VeggieWrap),
    s('static-lunch-4',  'Grilled Cheese Sandwich', 'Classic grilled cheese with melted cheddar on sourdough.',              89,  'Lunch', GrilledCheeseSandwich),
    s('static-lunch-5',  'Grilled Salmon Bowl',     'Grilled salmon over quinoa, roasted veggies, and lemon-dill sauce.',    225, 'Lunch', GrilledSalmonBowl),
    s('static-lunch-6',  'Spicy Beef Tacos',        'Soft tortillas filled with seasoned beef, salsa, and avocado.',         180, 'Lunch', SpicyBeefTacos),
    s('static-lunch-7',  'Sushi Combo',             'Assorted sushi rolls with tuna, salmon, avocado, and soy sauce.',       240, 'Lunch', SushiCombo),
    s('static-lunch-8',  'Red Chicken Curry',       'A balance of creamy, sweet, and slightly spicy notes.',                 89,  'Lunch', RedChickenCurry),
    s('static-lunch-9',  'Turkey Panini',           'Pressed panini with turkey, Swiss cheese, and pesto.',                  130, 'Lunch', TurkeyPanini),
    s('static-lunch-10', 'Quinoa Salad',            'Healthy salad with quinoa, mixed greens, and vinaigrette.',             118, 'Lunch', QuinoaSalad),
    s('static-lunch-11', 'Pasta Salad',             'Chilled pasta salad with fresh vegetables and Italian dressing.',       100, 'Lunch', PastaSalad),
    s('static-lunch-12', 'Fish Tacos',              'Grilled fish tacos with cabbage slaw and lime crema.',                  129, 'Lunch', FishTacos),

    // ── Dinner ───────────────────────────────────────────────────────────────
    s('static-dinner-1',  'Grilled Ribeye Steak',         'Juicy ribeye steak grilled to perfection.',                                249, 'Dinner', GrilledRibeyeSteak),
    s('static-dinner-2',  'Salmon Fillet',                 'Fresh salmon fillet with a lemon butter sauce.',                          220, 'Dinner', SalmonFillet),
    s('static-dinner-3',  'Roast Chicken',                 'Herb-roasted chicken served with seasonal vegetables.',                   199, 'Dinner', RoastChicken),
    s('static-dinner-4',  'Pasta Primavera',               'Pasta with fresh seasonal vegetables in a light sauce.',                  199, 'Dinner', PastaPrimavera),
    s('static-dinner-5',  'Chicken Parmesan',              'Crispy breaded chicken topped with marinara sauce and melted mozzarella.',199, 'Dinner', ChickenParmesan),
    s('static-dinner-6',  'Pesto Pasta with Shrimp',       'Linguine tossed in a vibrant pesto sauce with succulent shrimp.',        219, 'Dinner', PestoPastaWithShrimp),
    s('static-dinner-7',  'Garlic Butter Lamb Chops',      'Tender lamb chops glazed with rosemary garlic butter.',                  269, 'Dinner', GarlicButterLambChops),
    s('static-dinner-8',  'Vegetarian Stuffed Peppers',    'Bell peppers filled with quinoa, black beans, and vegetables.',          189, 'Dinner', VegetarianStuffedPeppers),
    s('static-dinner-9',  'Beef Bourguignon',              'Classic French beef stew with red wine and mushrooms.',                   250, 'Dinner', BeefBourguignon),
    s('static-dinner-10', 'Vegetable Stir Fry',            'Crispy vegetables stir-fried in a tangy sauce.',                         150, 'Dinner', VegetableStirFry),
    s('static-dinner-11', 'Shrimp Scampi',                 'Shrimp cooked in garlic butter sauce over linguine.',                    199, 'Dinner', ShrimpScampi),
    s('static-dinner-12', 'Lamb Chops',                    'Grilled lamb chops with rosemary and garlic.',                           285, 'Dinner', LambChops),

    // ── Mexican ──────────────────────────────────────────────────────────────
    s('static-mexican-1',  'Tacos al Pastor',   'Tacos with marinated pork, pineapple, and cilantro.',                                             120, 'Mexican', TacosalPastor),
    s('static-mexican-2',  'Chicken Quesadilla','Grilled quesadilla filled with chicken, cheese, and salsa.',                                      100, 'Mexican', ChickenQuesadilla),
    s('static-mexican-3',  'Enchiladas',         'Corn tortillas rolled around a filling and smothered in spicy sauce.',                           199, 'Mexican', Enchiladas),
    s('static-mexican-4',  'Fajitas',            'Sizzling steak or chicken served with peppers and onions.',                                      135, 'Mexican', Fajitas),
    s('static-mexican-5',  'Chiles Rellenos',    'Roasted poblano peppers stuffed with cheese, lightly battered and fried.',                      125, 'Mexican', ChilesRellenos),
    s('static-mexican-6',  'Mole Poblano',       'Tender chicken simmered in a complex rich mole sauce with hints of chocolate.',                  150, 'Mexican', MolePoblano),
    s('static-mexican-7',  'Pozole Rojo',        'Traditional soup with hominy, pork, and red chiles, garnished with radish and lime.',            140, 'Mexican', PozoleRojo),
    s('static-mexican-8',  'Churros',            'Fried dough pastries rolled in cinnamon sugar, served with chocolate sauce.',                    90,  'Mexican', Churros),
    s('static-mexican-9',  'Nachos',             'Crispy tortilla chips loaded with cheese and toppings.',                                         99,  'Mexican', Nachos),
    s('static-mexican-10', 'Burrito',            'A large flour tortilla filled with beans, rice, and meat.',                                      150, 'Mexican', Burrito),
    s('static-mexican-11', 'Tamales',            'Steamed masa filled with meats or vegetables.',                                                  89,  'Mexican', Tamales),
    s('static-mexican-12', 'Chilaquiles',        'Tortilla chips simmered in a red or green salsa.',                                               199, 'Mexican', Chilaquiles),

    // ── Italian ──────────────────────────────────────────────────────────────
    s('static-italian-1',  'Spaghetti Carbonara', 'Classic pasta with eggs, cheese, pancetta, and pepper.',                                       199, 'Italian', SpaghettiCarbonara),
    s('static-italian-2',  'Lasagna',             'Layers of pasta with meat sauce, cheese, and béchamel.',                                       150, 'Italian', Lasagna),
    s('static-italian-3',  'Risotto',             'Creamy Arborio rice cooked with broth and parmesan.',                                          699, 'Italian', Risotto),
    s('static-italian-4',  'Margherita Pizza',    'Pizza topped with tomato sauce, mozzarella, and basil.',                                       150, 'Italian', MargheritaPizza),
    s('static-italian-5',  'Penne Arrabbiata',    'Penne pasta tossed in a spicy tomato sauce infused with garlic and red chili flakes.',         189, 'Italian', PenneArrabbiata),
    s('static-italian-6',  'Caprese Salad',       'Fresh slices of tomato, mozzarella, and basil drizzled with olive oil and balsamic glaze.',    169, 'Italian', CapreseSalad),
    s('static-italian-7',  'Eggplant Parmesan',   'Breaded eggplant layered with marinara sauce, mozzarella, and Parmesan cheese.',              209, 'Italian', EggplantParmesan),
    s('static-italian-8',  'Focaccia Bread',      'Soft herbed focaccia with a crispy crust, drizzled with olive oil and sea salt.',             129, 'Italian', FocacciaBread),
    s('static-italian-9',  'Fettuccine Alfredo',  'Pasta in a rich and creamy Alfredo sauce.',                                                    140, 'Italian', FettuccineAlferdo),
    s('static-italian-10', 'Pesto Pasta',         'Pasta tossed in a vibrant basil pesto sauce.',                                                 599, 'Italian', PestoPasta),
    s('static-italian-11', 'Gnocchi',             'Soft potato dumplings served with a marinara sauce.',                                          999, 'Italian', Gnocchi),
    s('static-italian-12', 'Osso Buco',           'Braised veal shanks with vegetables and white wine.',                                          185, 'Italian', OssoBuco),

    // ── Desserts ─────────────────────────────────────────────────────────────
    s('static-desserts-1',  'Tiramisu',             'Classic Italian dessert with coffee and mascarpone.',                                         650, 'Desserts', TiramisuCake),
    s('static-desserts-2',  'Gelato',               'Italian-style ice cream available in various flavors.',                                       599, 'Desserts', Gelato),
    s('static-desserts-3',  'Cannoli',              'Crispy pastry tubes filled with sweet ricotta cream.',                                        700, 'Desserts', Cannoli),
    s('static-desserts-4',  'Panna Cotta',          'Smooth, creamy dessert topped with berry compote.',                                           499, 'Desserts', PannaCotta),
    s('static-desserts-5',  'Pavlova',              'Crispy meringue with a soft inside, topped with fresh fruits and whipped cream.',             680, 'Desserts', Pavlova),
    s('static-desserts-6',  'Chocolate Lava Cake',  'Warm chocolate cake with a molten center, served with vanilla ice cream.',                   750, 'Desserts', ChocolateLavaCake),
    s('static-desserts-7',  'Baklava',              'Layered pastry with chopped nuts and honey, a Middle Eastern delight.',                       600, 'Desserts', Baklava),
    s('static-desserts-8',  'Strawberry Shortcake', 'Fluffy cake layered with fresh strawberries and whipped cream.',                             680, 'Desserts', StrawberryShortcake),
    s('static-desserts-9',  'Cheesecake',           'Rich cheesecake with a graham cracker crust.',                                               99,  'Desserts', Cheesecake),
    s('static-desserts-10', 'Chocolate Mousse',     'Light and airy chocolate mousse with whipped cream.',                                        650, 'Desserts', ChocolateMousse),
    s('static-desserts-11', 'Profiteroles',         'Cream-filled pastry puffs drizzled with chocolate sauce.',                                   725, 'Desserts', Profiteroles),
    s('static-desserts-12', 'Ricotta Pie',          'Traditional ricotta pie with a light, flaky crust.',                                         675, 'Desserts', RicottaPie),

    // ── Drinks ───────────────────────────────────────────────────────────────
    s('static-drinks-1',  'Iced Latte',           'Cool and refreshing espresso-based iced latte.',                    50, 'Drinks', IcedLatte),
    s('static-drinks-2',  'Mojito',               'Classic mojito with mint, lime, and rum.',                          99, 'Drinks', Mojito),
    s('static-drinks-3',  'Smoothie',             'A blended mix of fruits for a refreshing drink.',                   60, 'Drinks', Smoothie),
    s('static-drinks-4',  'Iced Tea',             'Chilled iced tea with a hint of lemon.',                            39, 'Drinks', IcedTea),
    s('static-drinks-5',  'Mocha Frappuccino',    'Chilled coffee mixed with chocolate and blended with ice.',         55, 'Drinks', MochaFrappuccino),
    s('static-drinks-6',  'Green Tea Smoothie',   'A vibrant mix of green tea, fruits, and a splash of honey.',        60, 'Drinks', GreenTeaSmoothie),
    s('static-drinks-7',  'Caramel Macchiato',    'Layered espresso with steamed milk, topped with caramel drizzle.',  55, 'Drinks', CaramelMacchiato),
    s('static-drinks-8',  'Strawberry Milkshake', 'Creamy milkshake loaded with fresh strawberries and vanilla.',      65, 'Drinks', StrawberryMilkshake),
    s('static-drinks-9',  'Lemonade',             'Freshly squeezed lemonade with a tangy kick.',                      45, 'Drinks', Lemonade),
    s('static-drinks-10', 'Espresso',             'Strong and rich espresso shot to start your day.',                  30, 'Drinks', Espresso),
    s('static-drinks-11', 'Margarita',            'Refreshing margarita with tequila, lime, and a salt rim.',          70, 'Drinks', Margarita),
    s('static-drinks-12', 'Cappuccino',           'Frothy cappuccino with a perfect balance of espresso and milk.',    49, 'Drinks', Cappuccino),
];

export default staticFoodList;
